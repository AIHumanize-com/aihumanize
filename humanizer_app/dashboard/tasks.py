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
from django.core.mail import get_connection
from dashboard.models import WritingStyle
from common.style_ai import anaylze_style

@shared_task
def create_documents_record(input_text, output_text, user_id, purpose, level, readibility, model):
    
    word_count = len(input_text.split())
    
    # with transaction.atomic():
        # Create the Documents record
    document = Documents.objects.create(
        input_text=input_text,
        output_text=output_text,
        user_id=user_id,
        words_used=word_count,
        purpose=purpose,
        level=level,
        readibility=readibility,
        model=model,
    )

       
        
    return document.id  # Optionally return the document ID for further reference





# @shared_task
# def send_email_batch(campaign_id):
#     campaign = EmailCampaign.objects.get(id=campaign_id)
#     batch_recipient_ids = campaign.recipients[:1000]
#     remaining_recipient_ids = campaign.recipients[1000:]

#     subject = campaign.subject
#     from_email = 'updates@aihumanize.com'  # Replace with your actual sender email

#     for user_id in batch_recipient_ids:
        
#         user = UserModel.objects.get(id=user_id)
#         if user.does_email_receive == False:
#             continue
#         context = {'subject': subject, 'message': campaign.message, 'user': user}
#         html_content = render_to_string('dashboard/email_template.html', context)
        
#         email = EmailMultiAlternatives(subject, html_content, from_email, [user.email])
#         email.attach_alternative(html_content, "text/html")
#         email.send()

#     campaign.recipients = remaining_recipient_ids
#     campaign.save()

#     if remaining_recipient_ids:
#         send_email_batch.apply_async((campaign_id,), eta=timezone.now() + timedelta(days=1))
#     else:
#         campaign.completed = True
#         campaign.save()

@shared_task
def send_email_batch(campaign_id, start_index=0):
    campaign = EmailCampaign.objects.get(id=campaign_id)
    all_recipient_ids = campaign.recipients[start_index:]

    # Calculate batch sizes and limits
    batch_size = 100  # Number of recipients per email
    daily_limit = 100  # Half of your daily limit (2000 / 2)
    daily_recipient_limit = daily_limit * batch_size

    # Determine the range for this batch
    end_index = min(start_index + daily_recipient_limit, len(all_recipient_ids))
    batch_recipient_ids = all_recipient_ids[start_index:end_index]

    subject = campaign.subject
    from_email = 'support@aihumanize.com'

    # Initialize the SMTP connection
    with get_connection() as connection:
        for chunk in range(0, len(batch_recipient_ids), batch_size):
            current_batch = batch_recipient_ids[chunk:chunk + batch_size]
            to_emails = []

            for user_id in current_batch:
                user = UserModel.objects.get(id=user_id)
                if not user.does_email_receive:
                    continue
                to_emails.append(user.email)

            if to_emails:
                
                context = {'subject': subject, 'message': campaign.message}
                html_content = render_to_string('dashboard/email_template.html', context)
                email = EmailMultiAlternatives(subject, html_content, from_email, bcc=to_emails, connection=connection)
                email.attach_alternative(html_content, "text/html")
                email.send()

    # Schedule next batch or mark completion
    if end_index < len(all_recipient_ids):
        send_email_batch.apply_async((campaign_id, end_index), eta=timezone.now() + timedelta(days=1))
    else:
        campaign.completed = True
        campaign.save()



@shared_task
def analyse_text_task(text, name, description, user_id, writing_style_id):
    style = WritingStyle.objects.get(id=writing_style_id)
    analyze = anaylze_style(text)  
    style.status = 'completed'
    style.analyze = analyze
    style.save()
    