from allauth.account.signals import email_confirmed
from django.dispatch import receiver

@receiver(email_confirmed)
def activate_user(sender, request, email_address, **kwargs):
    """Activate user once the email address is confirmed."""
    user = email_address.user
    user.is_active = True
    user.save()