from django.shortcuts import render, redirect
from common.humanize_text import rewrite_text
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import DetectRequestCounter, UnregisteredUserWordCount
from payments.models import WordCountTracker, Subscription
# Create your views here.
from dashboard.tasks import create_documents_record
from common.detect_ai import detect_and_classify, detect_with_perx
from .forms import ContactForm
from django.contrib import messages
from django.utils import timezone

def index(request):
    context = {'paid': False}  # Default context

    if request.user.is_authenticated:
        # Get the latest paid subscription for the user (excluding 'FREE' plan type)
        latest_subscription = Subscription.objects.filter(
            user=request.user, 
            plan_type__in=[Subscription.MONTHLY, Subscription.YEARLY, Subscription.ENTERPRISE]
        ).order_by('-end_date').first()

        if latest_subscription and latest_subscription.end_date:
            # Check if the end_date is greater than today
            if latest_subscription.end_date > timezone.now():
                context['paid'] = True

    return render(request, 'front/index.html', context)

def pricing(request):
    return render(request, 'front/pricing.html')

@csrf_exempt
def humanizer(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
    
        text = body["text"]
        purpose = body["purpose"]
        model = body["model"]
        # readability = None
        # strength = None
        if model == "Maestro":
            pass
            # readability = body["readability"]
            # strength = body["level"]
        else:
            model = "Falcon"

        word_count = len(text.split())

        if word_count > 1500:
            return JsonResponse({"error": "word_limit_reached"}, status=400)
    

        if not request.user.is_authenticated:
            return JsonResponse({"error": "Word limit exceeded. Sign up for additional words or subscribe for unlimited access."}, status=400)

        
        # get last subscrioption of user
        subscrioption = Subscription.objects.filter(user=request.user).last()

        word_count_tracker = WordCountTracker.objects.filter(subscription__user=request.user).last()
        if word_count  > word_count_tracker.words_remaining:
            return JsonResponse({"error": "Limit is over please reset subscrioptions"}, status=400)
        # even if user has remanining words but subscrioption is expired, we need to check user is in paid plan
        if subscrioption.plan_type in [Subscription.MONTHLY, Subscription.YEARLY, Subscription.ENTERPRISE]:
            if subscrioption.end_date < timezone.now():
                return JsonResponse({"error": "Limit is over please reset subscrioptions"}, status=400)

        result = rewrite_text(text, purpose=purpose, readability="university", strength="easy", model_name=model)
        
        create_documents_record.delay(input_text=text, output_text=result, user_id=request.user.id, purpose=purpose, level=None, readibility=None, model=model)
        word_count_tracker.words_used += word_count
        word_count_tracker.save()
        return JsonResponse({"text": result})
        

@csrf_exempt
def detect_text(request):
    if request.user.is_authenticated:
        return handle_request(request)

    # Get or create a RequestCounter object for the user's IP address
    ip_address = get_client_ip(request)
    # TODO make celery task to delete old records and create task for creating new records
    counter, created = DetectRequestCounter.objects.get_or_create(ip_address=ip_address)

    # Limit the usage to 3 times for non-authenticated users
    if counter.request_count >= 50:
        return JsonResponse({'error': 'Limit reached'})
  
    # Increment the request count
    counter.request_count += 1
    counter.save()

    # Handle the request normally
    return handle_request(request)

def handle_request(request):
    if request.method == "POST":
        # Parse JSON from the request body
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        # result = detect_and_classify(body["text"])
        result  = detect_with_perx(body["text"])
        return JsonResponse(result, safe=False)

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip



def terms_view(request):
    return render(request, 'front/terms_of_use.html')

def privacy_view(request):
    return render(request, 'front/privacy_policy.html')

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')

    else:
        

        return render(request, 'front/contact.html')


def view_404(request, exception):
    return render(request, 'front/404.html', status=404)



def content_writer(request):
    return render(request, 'front/content_writer.html')