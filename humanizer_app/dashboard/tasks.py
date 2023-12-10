from celery import shared_task
from django.db import transaction
from .models import Documents
from payments.models import WordCountTracker
from django.db.models import F
from users.models import UserModel
from .models import EmailCampaign
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
@shared_task
def create_documents_record(input_text, output_text, user_id, purpose, level, readibility):
    """
    Create a record for Documents model with the given input_text, output_text, and user.

    Args:
        input_text (str): The input text.
        output_text (str): The output text.
        user_id (int): The ID of the user object.

    Returns:
        None
    """
    word_count = len(input_text.split())
    
    with transaction.atomic():
        # Create the Documents record
        document = Documents.objects.create(
            input_text=input_text,
            output_text=output_text,
            user_id=user_id,
            words_used=word_count,
            purpose=purpose,
            level=level,
            readibility=readibility
        )

        # Update the WordCountTracker
        WordCountTracker.objects.filter(
            subscription__user_id=user_id,
            subscription__is_active=True
        ).update(words_used=F('words_used') + word_count)
        
    return document.id  # Optionally return the document ID for further reference





@shared_task
def send_email_batch(campaign_id):
    campaign = EmailCampaign.objects.get(id=campaign_id)
    batch_recipient_ids = campaign.recipients[:400]
    remaining_recipient_ids = campaign.recipients[400:]

    subject = campaign.subject
    from_email = 'support@aihumanize.com'  # Replace with your actual sender email

    for user_id in batch_recipient_ids:
        
        user = UserModel.objects.get(id=user_id)
        if user.does_email_receive == False:
            continue
        context = {'subject': subject, 'message': campaign.message, 'user': user}
        html_content = render_to_string('dashboard/email_template.html', context)
        
        email = EmailMultiAlternatives(subject, html_content, from_email, [user.email])
        email.attach_alternative(html_content, "text/html")
        email.send()

    campaign.recipients = remaining_recipient_ids
    campaign.save()

    if remaining_recipient_ids:
        send_email_batch.apply_async((campaign_id,), eta=timezone.now() + timedelta(days=1))
    else:
        campaign.completed = True
        campaign.save()
