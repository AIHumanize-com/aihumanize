# tasks.py

from celery import shared_task
from django.core.mail import EmailMessage

@shared_task
def send_email_task(subject, body, from_email, recipient_list):
    email = EmailMessage(subject, body, from_email, recipient_list)
    email.send()

    
