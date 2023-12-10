from django.db import models
from users.models import UserModel
# Create your models here.
import uuid 

from django_ckeditor_5.fields import CKEditor5Field
 # Import your Celery task

class Documents(models.Model):
    input_text = models.TextField()
    output_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    words_used = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    purpose = models.CharField(max_length=100, null=True, blank=True)
    level = models.CharField(max_length=100, null=True, blank=True)
    readibility = models.CharField(max_length=100, null=True, blank=True)
    document_id = models.UUIDField(default = uuid.uuid4, editable = False)


class EmailCampaign(models.Model):
    MONTHLY = 'monthly'
    YEARLY = 'yearly'
    ENTERPRISE = 'enterprise'
    FREE = 'free'
    ALL = 'all'

    PLAN_CHOICES = [
        (MONTHLY, 'Monthly'),
        (YEARLY, 'Yearly'),
        (ENTERPRISE, 'Enterprise'),
        (FREE, 'Free'),
        (ALL, 'all')
    ]
    subject = models.CharField(max_length=255)
    message = CKEditor5Field()
    sent_at = models.DateTimeField(auto_now_add=True)
    recipients = models.JSONField(null=True, blank=True)  # Store the list of user IDs to whom the email will be sent
    completed = models.BooleanField(default=False)
    subscrioption_type = models.CharField(max_length=10, choices=PLAN_CHOICES, null=True,)

    def __str__(self):
        return self.subject
    
    def save(self, *args, **kwargs):
        from .tasks import send_email_batch 
        is_new = self._state.adding
        if is_new:
            # Determine and set recipients based on subscription type
            if self.subscrioption_type == self.ALL:
                recipient_users = UserModel.objects.all()
            else:
                recipient_users = UserModel.objects.filter(subscription__plan_type=self.subscrioption_type)

            self.recipients = list(recipient_users.values_list('id', flat=True))
        
        super().save(*args, **kwargs)

        if is_new:
            # Trigger Celery task after the campaign is saved
            send_email_batch.delay(self.id)


