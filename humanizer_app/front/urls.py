
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
    path("affiliate-program/", views.affiliate_program, name="affiliate_program"),
    path("affiliate-program/terms-of-service/", views.terms_of_use_affiliate, name="terms_of_use_affiliate"),
    path("paraphrasing-tool/", views.paraphraser_view, name="paraphraser"),
    path("human-content-writer/", views.human_content_writer_view, name="human_content_writer"),
    path("api/humanizer/", views.humanizer_api, name="api_humanizer"),
   
]
