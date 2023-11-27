
from django.urls import path
from .views import index, profile, edit_profile, documents

urlpatterns = [
    path('', index, name='dashboard'),
    path('profile/', profile, name='profile'),
    path("profile/edit/", edit_profile, name="edit_profile"),
    path("documents/", documents, name="documents"),
]
