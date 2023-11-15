
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('humanizer/', views.humanizer, name='humanizer'),
    path('detect/', views.detect_text, name='detect_text')
   
]
