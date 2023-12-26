from celery import shared_task
from users.models import UserModel
from payments.models import Subscription, WordCountTracker
from .mautic_contacts import get_contact, create_contact, update_contact
from allauth.socialaccount.models import SocialAccount
import json

@shared_task
def sync_with_crm():
    for user in UserModel.objects.filter(is_active=True):
        try:
            # Get subscription and word tracker data
            subscription = Subscription.objects.filter(user=user).order_by('-start_date').first()
            word_tracker = WordCountTracker.objects.get(subscription=subscription)

            # Check for social account
            try:
                social_account = SocialAccount.objects.get(user=user)
                first_name = social_account.extra_data.get('given_name', 'No firstname')
                last_name = social_account.extra_data.get('family_name', 'No lastname')
            except SocialAccount.DoesNotExist:
                # Fallback to fullname or default values
                first_name, last_name = (user.fullname.split() + ['No firstname', 'No lastname'])[:2]

            contact_data = {
                "is_subscription_active": subscription.is_active,
                "sub_start_date": subscription.start_date.strftime("%Y-%m-%d"),
                "sub_actual_end_date": subscription.actual_end_date.strftime("%Y-%m-%d") if subscription.actual_end_date else None,
                "subscription_end_date": subscription.end_date.strftime("%Y-%m-%d") if subscription.end_date else None,
                "words_remaining": word_tracker.words_remaining,
                "words_used": word_tracker.words_used,
                "subscription_plan": subscription.plan_type,
                "firstname": first_name,
                "lastname": last_name,
                "email": user.email,
                "last_active": user.user_registered_at.strftime("%Y-%m-%d")
            }
            

            # Contact creation or update logic
            if get_contact(user.email):
                contact_data.pop("email")
                update_contact(user.email, **contact_data)
            else:
                create_contact(**contact_data)

        except Exception as e:
            print(f"Error syncing user {user.email}: {e}")



