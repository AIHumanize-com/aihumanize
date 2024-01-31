from datetime import datetime, timedelta
import random

# Fake data
is_subscription_active = random.choice([True, False])
sub_start_date = (datetime.now() - timedelta(days=random.randint(30, 365))).strftime("%m-%d-%y")
sub_actual_end_date = (datetime.now() - timedelta(days=random.randint(1, 29))).strftime("%Y-%m-%d") if is_subscription_active else None
subscription_end_date = (datetime.now() + timedelta(days=random.randint(30, 365))).strftime("%Y-%m-%d") if is_subscription_active else None
words_remaining = random.randint(0, 10000)
words_used = random.randint(0, 10000)
subscription_plan = random.choice(["Basic", "Premium", "Pro"])
first_name = "John pop"
last_name = "Doe"
email = "johndoe@example.com"
last_active = (datetime.now() - timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
print(sub_start_date)
# Populated dictionary
contact_data = {
    "is_subscription_active": True,
    "sub_start_date": sub_start_date,
    "sub_actual_end_date": sub_actual_end_date,
    "subscription_end_date": subscription_end_date,
    "words_remaining": words_remaining,
    "words_used": words_used,
    "subscription_plan": subscription_plan,
    "name": first_name,
    "lastname": last_name,
    "email": email,
    "last_active": last_active
}
