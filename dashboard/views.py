from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def index(request):
    return render(request, "dashboard/dashboard.html")

@login_required
def profile(request):
    return render(request, "dashboard/profile.html")

@login_required
def edit_profile(request):
    return render(request, "dashboard/edit_profile.html")