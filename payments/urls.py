# urls.py

from django.urls import path
from . import views

urlpatterns = [
    # ... other urls ...
    path('create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    path('webhooks/stripe/', views.stripe_webhook, name='stripe-webhook'),
]
