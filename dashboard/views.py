from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from payments.models import Subscription, WordCountTracker
from .models import Documents
from django.core.paginator import Paginator

# Create your views here.
def get_dashboard_data(user):
    data = {'subscription_name': 'No Active Subscription', 'available_words': 0, 'used_words': 0, 'used_percentage': 0}
    
    active_subscription = Subscription.objects.filter(user=user, is_active=True).first()
    if active_subscription:
        data['subscription_name'] = active_subscription.plan_type.capitalize()
        word_count_tracker = WordCountTracker.objects.filter(subscription=active_subscription).first()
        if word_count_tracker:
            data['available_words'] = word_count_tracker.words_remaining
            data['words_purchased'] = word_count_tracker.words_purchased
            data['used_words'] = word_count_tracker.words_used
            if word_count_tracker.words_purchased > 0:
                data['used_percentage'] = (word_count_tracker.words_used / word_count_tracker.words_purchased) * 100

    return data

@login_required
def index(request):
    context = get_dashboard_data(request.user)
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
    paginator = Paginator(documents, 3)  # Show 10 documents per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'documents': page_obj
    }
    return render(request, "dashboard/documents.html", context=context)