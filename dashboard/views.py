from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from payments.models import Subscription, WordCountTracker
from .models import Documents
from django.core.paginator import Paginator
from django.db.models import Avg
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse, Http404
import uuid
# Create your views here.
def get_dashboard_data(user):
    data = {'subscription_name': 'No Active Subscription', 'available_words': 0, 'used_words': 0, 'used_percentage': 0}
    
    active_subscription = Subscription.objects.filter(user=user, is_active=True).first()
    if active_subscription:
        data['subscription_name'] = active_subscription.plan_type.capitalize()
        word_count_tracker = WordCountTracker.objects.filter(subscription=active_subscription).first()
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
            data["average_words_per_document"] = average_words_per_document
            if word_count_tracker.words_purchased > 0:
                data['used_percentage'] = (word_count_tracker.words_used / word_count_tracker.words_purchased) * 100

    return data

@login_required
def index(request):
    context = get_dashboard_data(request.user)
    recent_documents = Documents.objects.filter(user=request.user).order_by('-created_at')[:5]
    context["recent_documents"] = recent_documents
    return render(request, "dashboard/dashboard.html", context)


@login_required
def profile(request):
    context = get_dashboard_data(request.user)
    return render(request, "dashboard/profile.html", context=context)

@login_required
def edit_profile(request):
    context = get_dashboard_data(request.user)
    if request.method == 'POST':
        fullname = request.POST.get('fullname')
        country = request.POST.get('country')
        user = request.user
        user.fullname = fullname
        user.country = country
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