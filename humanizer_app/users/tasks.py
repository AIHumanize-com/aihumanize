# tasks.py

from celery import shared_task
from django.core.mail import EmailMessage
from allauth.account.utils import send_email_confirmation
from .models import UserModel
@shared_task
def send_email_task(subject, body, from_email, recipient_list):
    email = EmailMessage(subject, body, from_email, recipient_list)
    email.send()



@shared_task
def send_eman_confirm_sign_up(requset, user_id):
    user = UserModel.objects.get(id=user_id)
    send_email_confirmation(requset, user, signup=True)