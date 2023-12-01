# urls.py

from django.urls import path
from . import views

urlpatterns = [
    # ... other urls ...
    path('create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    path('webhooks/stripe/', views.stripe_webhook, name='stripe-webhook'),
    path("cancel_subscrioption/<str:subscription_id>", views.cancel_stripe_subscription_view, name="cancel_subscrioption"),
]
