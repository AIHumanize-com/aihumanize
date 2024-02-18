# tasks.py
from common.sendpulse import update_user, get_token, change_sendpulse_variable
from celery import shared_task
from django.core.mail import EmailMessage
from users.models import UserModel
from payments.models import Subscription, WordCountTracker
from allauth.socialaccount.models import SocialAccount
from django.utils import timezone
from dashboard.models import Documents

@shared_task
def send_email_task(subject, body, from_email, recipient_list):
    email = EmailMessage(subject, body, from_email, recipient_list)
    email.send()

    
@shared_task
def send_to_sendpulse_task(user_id, upgrade_alert=0):
    user = UserModel.objects.get(id=user_id)
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
                try:
                    first_name, last_name = (user.fullname.split() + ['No firstname', 'No lastname'])[:2]
                except:
                    first_name, last_name = (None, None)
            try:
                document = Documents.objects.filter(user=user).order_by('-created_at').first()
                document_time = document.created_at.strftime("%m-%d-%y")
            except:
                document_time = None

            contact_data = {
                "is_subscrioption_active": subscription.is_active,
                "sub_start_date": subscription.start_date.strftime("%m-%d-%y"),
                "sub_actual_end_date": subscription.actual_end_date.strftime("%m-%d-%y") if subscription.actual_end_date else None,
                "subscription_end_date": subscription.end_date.strftime("%m-%d-%y") if subscription.end_date else None,
                "words_remaining": word_tracker.words_remaining,
                "words_used": word_tracker.words_used,
                "subscription_plan": subscription.plan_type,
                "name": first_name,
                "lastname": last_name,
                "email": user.email,
                "upgrade_alert": upgrade_alert,
                "last_active_by_document": document_time,
                "subscription_price": float(subscription.price_in_cents) / 100.0,  # Ensuring division results in a float for correct pricing
            }
            # print(contact_data)

            

            # Contact creation or update logic
            email = contact_data.pop("email") 
            token = get_token()
           
            result = update_user(email=email, token=token, **contact_data)
            
               

    except Exception as e:
        print(f"Error syncing user {user.email}: {e}")



@shared_task
def change_variable_task(email, variable_name, variable_value, ):
    token = get_token()
    result = change_sendpulse_variable(email, variable_name, variable_value, token)
    print(result)