import requests
import json

def send_test_webhook(url, event_data):
    headers = {
        # Optionally add headers here, e.g., for authentication
        'Content-Type': 'application/json',
    }

    response = requests.post(url, headers=headers, data=json.dumps(event_data))
    return response

# Replace with your webhook URL
webhook_url = 'http://localhost:8000/payments/webhooks/stripe/'

# Simulated Stripe webhook data
stripe_event_data = {
    # Include the necessary fields to simulate 'invoice.payment_succeeded'
    "type": "invoice.payment_succeeded",
    "data": {
        "object": {
            "customer": "cus_P646mtpSpRwxTv",
            "amount_paid": 899,  # Example amount in cents
            "created": 1701280921,  # Example timestamp
            "currency": "usd",
            "id": "23",
            "status": "paid",
            # Add other fields as needed to match the structure of Stripe's webhook data
        }
    }
}

# Send the test webhook
response = send_test_webhook(webhook_url, stripe_event_data)
print(f"Response Status: {response.status_code}")
print(f"Response Body: {response.text}")
