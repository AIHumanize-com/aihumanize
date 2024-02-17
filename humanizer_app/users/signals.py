from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from allauth.socialaccount.models import SocialAccount
from django.db.models.signals import post_save
from payments.models import Subscription, WordCountTracker
from .models import UserModel
from django.utils import timezone
from .tasks import send_to_sendpulse_task

@receiver(email_confirmed)
def activate_user(sender, request, email_address, **kwargs):
    """Activate user once the email address is confirmed."""
    user = email_address.user
    user.is_active = True
    user.save()
    send_to_sendpulse_task.delay(user.id)




# SocialAccount.objects.filter(user=user).exists()

@receiver(post_save, sender=SocialAccount)
def activate_user_social(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        user.is_active = True
        user.save()
        subscriopton = Subscription.objects.create(user_id=user.id, plan_type='free', word_count=400, price_in_cents=0, start_date=timezone.now(), is_active=True)
        word_counter = WordCountTracker.objects.create(subscription_id=subscriopton.id, words_purchased=400, words_used=0)
        send_to_sendpulse_task.delay(user.id)