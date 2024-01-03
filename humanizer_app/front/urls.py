
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('humanizer/', views.humanizer, name='humanizer'),
    path('detect/', views.detect_text, name='detect_text'),
    path('pricing/', views.pricing, name='pricing'),
    path("terms-and-conditions/", views.terms_view, name="terms"),
    path("privacy-policy/", views.privacy_view, name="privacy"),
    path("contact-us/", views.contact_view, name="contact"),
    path("ai-content-writer/", views.content_writer, name="content_writer"),
   
]
