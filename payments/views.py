from django.shortcuts import render

# Create your views here.
# views.py

import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views import View
from users.models import UserModel
from payments.models import Subscription
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseForbidden
import json

def calculate_price(plan_type: str, word_count: int):
    # Validate plan_type
    valid_plan_types = ["monthly", "yearly", "enterprise"]
    if plan_type.lower() not in valid_plan_types:
        raise ValueError(f"Invalid plan type: {plan_type}. Valid plan types are {valid_plan_types}.")

    # Validate word_count
    if not isinstance(word_count, int) or word_count <= 0:
        raise ValueError("Word count must be a positive integer.")

    # Define minimum word counts for each plan to prevent unrealistic low word counts
    min_word_counts = {
        "monthly": 10000,  # Example: 10,000 words minimum for monthly
        "yearly": 10000,   # Example: 10,000 words minimum for yearly
        "enterprise": 500000  # Example: 500,000 words minimum for enterprise
    }

    if word_count < min_word_counts[plan_type.lower()]:
        raise ValueError(f"Word count for {plan_type} plan must be at least {min_word_counts[plan_type.lower()]}.")

    # Price calculation
    if plan_type.lower() == "monthly":
        price = word_count * 0.000899
        plan = "month"
    elif plan_type.lower() == "yearly":
        price = word_count * 0.000499 * 12
        plan = "year"
    elif plan_type.lower() == "enterprise":
        price = word_count * 0.0004
        plan = "month"

    return round(price, 2), plan


  # Import your models

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckoutSessionView(View):
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            # Return a 401 Unauthorized response or a custom JSON response
            return HttpResponseForbidden('User not authenticated')
        # Retrieve the user and their subscription plan details
        user = UserModel.objects.get(email=request.user.email)
        # Example: retrieve plan details (word count, price) from the request
        # Adjust this part based on how you store and retrieve plan details
        data = json.loads(request.body)
     
        plan_type = data.get('plan_type')
        word_count = data.get('word_count')
        price, plan = calculate_price(plan_type, word_count)  # Implement this function based on your pricing logic
        
        try:
            checkout_session = stripe.checkout.Session.create(
                customer_email=user.email,
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            "recurring":{'interval': plan},
                            'product_data': {
                                'name': f'{plan_type.capitalize()} Plan - {word_count} Words',
                            },
                            'unit_amount': int(price * 100),  # Stripe expects the amount in cents
                        },
                        'quantity': 1,
                    },
                ],
                mode='subscription',
                success_url='http://localhost:8000',
                cancel_url='http://localhost:8000',
            )
            return JsonResponse({'id': checkout_session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)
    print(event)
    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Perform some action after a successful checkout session
        # e.g., create or update the subscription in your database

    # Other event types can be handled here

    return HttpResponse(status=200)