from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from payments.models import Subscription, WordCountTracker
from .models import Documents, WritingStyle, StylePurchase
from django.core.paginator import Paginator
from django.db.models import Avg
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse, Http404
import uuid
import stripe
from django.conf import settings
import datetime
from django.contrib.auth import logout
from common.content_writer import generate_content, extend_text
import json
from common.style_ai import anaylze_style
from .forms import WritingStyleForm
from django.contrib import messages
from dashboard.tasks import analyse_text_task
stripe.api_key = settings.STRIPE_SECRET_KEY

# Create your views here.
def get_dashboard_data(user):
    data = {'subscription_name': 'No Active Subscription', 'available_words': 0, 'used_words': 0, 'used_percentage': 0}
    
    active_subscription = Subscription.objects.filter(user=user, is_active=True).first()
    if active_subscription:
        data['subscription_name'] = active_subscription.plan_type.capitalize()
        data["subscrioption_price"] = active_subscription.price_in_cents / 100
        data["subscrioption_id"] =  active_subscription.stripe_subscription_id
        
        try:
            data["next_due_date"] = active_subscription.end_date.date
        except: 
          
            data["next_due_date"] = active_subscription.end_date
    word_count_tracker = WordCountTracker.objects.filter(subscription__user=user).last()
    documents_count = Documents.objects.filter(user=user).count()
    average_words_per_document = Documents.objects.filter(user=user).aggregate(average_words=Avg('words_used'))['average_words']

# You might want to handle the case where there are no documents
    if average_words_per_document is None:
        average_words_per_document = 0
    
    if word_count_tracker:
        data['available_words'] = word_count_tracker.words_remaining
        data['words_purchased'] = word_count_tracker.words_purchased
        data['used_words'] = word_count_tracker.words_used
        data["documents_count"] = documents_count
        data["average_words_per_document"] = round(average_words_per_document)
        if word_count_tracker.words_purchased > 0:
            data['used_percentage'] = (word_count_tracker.words_used / word_count_tracker.words_purchased) * 100

    return data

@login_required
def index(request):
    context = get_dashboard_data(request.user)
    recent_documents = Documents.objects.filter(user=request.user).order_by('-created_at')[:5]
    if recent_documents.count() > 0:
        context["recent_documents"] = recent_documents
    else:
        context["recent_documents"] = None
    context["recent_documents"] = recent_documents
    return render(request, "dashboard/dashboard.html", context)

def get_stripe_customer_id_by_email(user_email):
    customers = stripe.Customer.list(email=user_email).auto_paging_iter()
    for customer in customers:
        # Assuming one email is associated with only one customer
        return customer.id
    return None

def get_formated_invoices(customer_id):
    formatted_invoices = []
    invoices = stripe.Invoice.list(customer=customer_id)
    for invoice in invoices.get('data', []):
        # Subscription Name
        subscription_name = invoice['lines']['data'][0]['description'] if invoice['lines']['data'] else 'N/A'

        # Payment Date (convert from Unix timestamp to human-readable date)
        payment_date = datetime.datetime.fromtimestamp(invoice['created']).strftime('%Y-%m-%d')

        # Total (convert from smallest currency unit to standard format, e.g., cents to dollars)
        total = invoice['total'] / 100.0

        # Status
        status = invoice['status']

        formatted_invoices.append({
            'subscription_name': subscription_name.replace("1 ×", ""),
            'payment_date': payment_date,
            'total': total,
            'status': status,
            'invoice_pdf': invoice['invoice_pdf'],

        })
    return formatted_invoices

@login_required
def profile(request):
    user_email = request.user.email
    customer_id = get_stripe_customer_id_by_email(user_email)
    
    if customer_id:
        invoices = get_formated_invoices(customer_id)
        # Or use stripe.Charge.list(customer=customer_id) if you want to list charges
    else:
        invoices = []
    context = get_dashboard_data(request.user)
    context["invoices"] = invoices
    context["subscription_name_period"] = context["subscription_name"].replace("ly", "")
    return render(request, "dashboard/profile.html", context=context)

@login_required
def edit_profile(request):
    context = get_dashboard_data(request.user)
    if request.method == 'POST':
        fullname = request.POST.get('fullname')
        country = request.POST.get('country')
        is_checked = 'check_box' in request.POST

        if is_checked:
            checked = True
        else:
            checked = False
        user = request.user
        user.fullname = fullname
        user.country = country
        user.does_email_receive = checked
        user.save()
        return redirect('profile')
    
    return render(request, "dashboard/edit_profile.html", context=context)


@login_required
def documents(request):
    # Fetch search query and sort parameters from the request
    search_query = request.GET.get('search', '')
    sort_by = request.GET.get('sort', '-created_at')  # Default sort is by created_at

    # Filter and sort documents based on the search query and sort parameter
    documents = Documents.objects.filter(
        user=request.user, 
        input_text__icontains=search_query  # Assuming you are searching by document name
    ).order_by(sort_by)

    # Add Pagination
    paginator = Paginator(documents, 15)  # Show 10 documents per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'documents': page_obj
    }
    return render(request, "dashboard/documents.html", context=context)


@login_required
def document_detail(request, document_id):
    try:
        # Make sure we have a valid UUID
        uuid.UUID(document_id)
    except ValueError:
        raise Http404("Invalid document ID format.")

    # Retrieve the document, making sure it exists and belongs to the current user
    try:
        document = Documents.objects.get(document_id=document_id, user=request.user)
    except Documents.DoesNotExist:
        raise Http404("Document not found.")

    # If the user is not the owner of the document, raise PermissionDenied
    if document.user != request.user:
        raise PermissionDenied

    # Prepare the data to be returned as JSON
    data = {
        'input_text': document.input_text,
        'output_text': document.output_text,
        'created_at': document.created_at.isoformat(),
        'words_used': document.words_used,
        'purpose': document.purpose,
        'level': document.level,
        'readibility': document.readibility,
        'document_id': str(document.document_id),  # Convert UUID to string
    }

    return JsonResponse(data)


@login_required
def logout_view(request):
    logout(request)
    return redirect('index')


@login_required
def text_editor(request):
    return render(request, 'dashboard/editor.html')


@login_required
def generate_text(request):
    if request.method == 'POST':
        # Parse JSON data from the request body
        data = json.loads(request.body)
        topic = data.get('topic')
        tone = data.get('tone')
        keywords = data.get('keywords')
        language = data.get('language')
        content_type = data.get('content_type')
        min_words_count = data.get('min_words_count')
        max_words_count = data.get('max_words_count')
        user = request.user
        document_id = uuid.uuid4()
        # Call your custom text generation function
        subscrioption = Subscription.objects.filter(user=request.user).last()

        
        if  subscrioption.is_active == False or subscrioption.plan_type == Subscription.FREE:
            return JsonResponse({"error": "Upgrade required"}, status=400)
        result = generate_content(content_type, topic, tone, keywords, language)
       
        
        # Return the result as JSON
        return JsonResponse({'result': result, 'document_id': str(document_id)})
    


@login_required
def extend_text_view(request):
    if request.method == 'POST':
        # Parse JSON data from the request body
        data = json.loads(request.body)
        text = data.get('text')
        tone = data.get('tone')
        keywords = data.get('keywords')
        language = data.get('language')
        min_words_count = data.get('min_words_count')
        max_words_count = data.get('max_words_count')
       
        subscrioption = Subscription.objects.filter(user=request.user).last()

        
        if  subscrioption.is_active == False or subscrioption.plan_type == Subscription.FREE:
            return JsonResponse({"error": "Upgrade required"}, status=400)

        # Call your custom text generation function
        result = extend_text(text, tone, keywords, language, max_words_count, min_words_count)
   
        
        return JsonResponse({'result': result})
    


def style_view(request):
    if request.method == "POST":
        form = WritingStyleForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            description = form.cleaned_data['description']
            text = form.cleaned_data['text']
            user = request.user
            created_style = WritingStyle.objects.create(name=name, description=description, user=user, status='processing')
            analyse_text_task.delay(text, name, description, user.id, created_style.id)
            messages.info(request, 'Your text is being analyzed. This may take up to 10 minutes. Please refresh the page to check the status.')
            return redirect('styles_list')  # Redirect after POST
        else:
            # Form is not valid, render the page with form errors
            return render(request, 'dashboard/style.html', {'form': form})
    else:
        form = WritingStyleForm()

        total_available = 1

        user_purchases = StylePurchase.objects.filter(user=request.user)
        for purchase in user_purchases:
            total_available += purchase.quantity - purchase.used_count
        

        user_styles = WritingStyle.objects.filter(user=request.user).order_by('-created_at')
        
        can_create = total_available > user_styles.count()
        # plan type should not be free
        is_subscribed = True
        subscribtion = Subscription.objects.filter(user=request.user, is_active=True).last()
        if subscribtion.plan_type == Subscription.FREE:
            is_subscribed = False

        print(is_subscribed)
        print(can_create)
        if is_subscribed and can_create:
            return render(request, 'dashboard/style.html', {'form': form})
        else:
            return redirect('styles_list')

    



@login_required
def styles_list(request):
    user_styles = WritingStyle.objects.filter(user=request.user).order_by('-created_at')

    # Aggregate total available and used styles
    total_available = 1

    user_purchases = StylePurchase.objects.filter(user=request.user)
    for purchase in user_purchases:
        total_available += purchase.quantity - purchase.used_count
    
    

    # Pagination
    paginator = Paginator(user_styles, 15)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    can_create = total_available > user_styles.count()
    # plan type should not be free
    is_subscribed = True
    subscribtion = Subscription.objects.filter(user=request.user, is_active=True).last()
    if subscribtion.plan_type == Subscription.FREE:
        is_subscribed = False
    context = {
        'styles': page_obj,
        'total_available': total_available,
        'total_used': user_styles.count(),
        "can_create": can_create,
        "is_subscribed": is_subscribed
    }
    return render(request, "dashboard/styles_list.html", context=context)


@login_required
def style_detail(request, style_id):
    try:
        style = WritingStyle.objects.get(id=style_id, user=request.user)
        context = {
            'writing_style': style
        }
        return render(request, "dashboard/style_detail.html", context=context)
    except WritingStyle.DoesNotExist:
        return  redirect('styles_list')

def update_basic_info(request, style_id):
    try:
        writing_style = WritingStyle.objects.get(id=style_id, user=request.user)

        if request.method == "POST":
            writing_style.name = request.POST.get('name')
            writing_style.description = request.POST.get('description')
            writing_style.save()

            messages.success(request, "Basic information updated successfully.")
            return redirect('style_detail', style_id=style_id)

        # Redirect to detail page with form
        return redirect('style_detail', style_id=style_id)
    except WritingStyle.DoesNotExist:
        return  redirect('styles_list')



def update_analyze_data(request, style_id):
    try:
        writing_style = WritingStyle.objects.get(id=style_id, user=request.user)

        if request.method == "POST":
            new_analyze_data = writing_style.analyze

            # Updating each field in the analyze data
            new_analyze_data['language_use']['formality'] = request.POST.get('language_use_formality', '')
            new_analyze_data['language_use']['technicality'] = request.POST.get('language_use_technicality', '')
            new_analyze_data['language_use']['colloquialisms'] = request.POST.get('language_use_colloquialisms', '')

            new_analyze_data['sentence_structure']['length'] = request.POST.get('sentence_structure_length', '')
            new_analyze_data['sentence_structure']['complexity'] = request.POST.get('sentence_structure_complexity', '')
            new_analyze_data['sentence_structure']['variety'] = request.POST.get('sentence_structure_variety', '')

            new_analyze_data['vocabulary_level']['basic_advanced_specialized'] = request.POST.get('vocabulary_level_basic_advanced_specialized', '')
            new_analyze_data['vocabulary_level']['abstract_concrete'] = request.POST.get('vocabulary_level_abstract_concrete', '')

            new_analyze_data['tone_and_voice']['emotional_tone'] = request.POST.get('tone_and_voice_emotional_tone', '')
            new_analyze_data['tone_and_voice']['author_personality'] = request.POST.get('tone_and_voice_author_personality', '')

            new_analyze_data['rhythm_and_flow']['pacing'] = request.POST.get('rhythm_and_flow_pacing', '')
            new_analyze_data['rhythm_and_flow']['stylistic_elements'] = request.POST.get('rhythm_and_flow_stylistic_elements', '')

            new_analyze_data['literary_devices']['metaphors_similes'] = request.POST.get('literary_devices_metaphors_similes', '')
            new_analyze_data['literary_devices']['symbolism'] = request.POST.get('literary_devices_symbolism', '')
            new_analyze_data['literary_devices']['irony'] = request.POST.get('literary_devices_irony', '')

            new_analyze_data['rhetorical_strategies']['persuasion_techniques'] = request.POST.get('rhetorical_strategies_persuasion_techniques', '')
            new_analyze_data['rhetorical_strategies']['argument_structure'] = request.POST.get('rhetorical_strategies_argument_structure', '')

            new_analyze_data['formatting_and_presentation']['paragraph_structure'] = request.POST.get('formatting_and_presentation_paragraph_structure', '')
            new_analyze_data['formatting_and_presentation']['use_of_headings'] = request.POST.get('formatting_and_presentation_use_of_headings', '')

            new_analyze_data['audience_engagement']['direct_address'] = request.POST.get('audience_engagement_direct_address', '')
            new_analyze_data['audience_engagement']['questions'] = request.POST.get('audience_engagement_questions', '')
            new_analyze_data['audience_engagement']['call_to_action'] = request.POST.get('audience_engagement_call_to_action', '')

            new_analyze_data['consistency_and_coherence']['flow_of_ideas'] = request.POST.get('consistency_and_coherence_flow_of_ideas', '')
            new_analyze_data['consistency_and_coherence']['consistent_tense_style'] = request.POST.get('consistency_and_coherence_consistent_tense_style', '')

            new_analyze_data['content_theme']['information_density'] = request.POST.get('content_theme_information_density', '')
            new_analyze_data['content_theme']['factual_vs_anecdotal'] = request.POST.get('content_theme_factual_vs_anecdotal', '')

            new_analyze_data['content_purpose']['informative_vs_entertaining'] = request.POST.get('content_purpose_informative_vs_entertaining', '')
            new_analyze_data['content_purpose']['educational_value'] = request.POST.get('content_purpose_educational_value', '')
            
            writing_style.analyze = new_analyze_data
            writing_style.save()

            messages.success(request, "Analyze data updated successfully.")
            return redirect('style_detail', style_id=style_id)
    except WritingStyle.DoesNotExist:
        return redirect('styles_list')

    return redirect('style_detail', style_id=style_id)

