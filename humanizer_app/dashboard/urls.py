
from django.urls import path
from .views import index, profile, edit_profile, documents, document_detail,logout_view

urlpatterns = [
    path('', index, name='dashboard'),
    path('profile/', profile, name='profile'),
    path("profile/edit/", edit_profile, name="edit_profile"),
    path("documents/", documents, name="documents"),
    path('documents/<str:document_id>/', document_detail, name='document_detail_api'),
    path("logout/", logout_view, name="logout"),


]
