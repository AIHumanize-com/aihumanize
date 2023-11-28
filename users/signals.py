from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from allauth.socialaccount.models import SocialAccount
from django.db.models.signals import post_save

from .models import UserModel
@receiver(email_confirmed)
def activate_user(sender, request, email_address, **kwargs):
    """Activate user once the email address is confirmed."""
    user = email_address.user
    user.is_active = True
    user.save()




# SocialAccount.objects.filter(user=user).exists()

@receiver(post_save, sender=SocialAccount)
def activate_user_social(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        user.is_active = True
        user.save()