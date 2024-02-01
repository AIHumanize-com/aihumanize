from common.sendpulse import send_contact, get_token

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Contact

@receiver(post_save, sender=Contact)
def post_save_contact(sender, instance, created, **kwargs):
    if created:  # Only proceed if a new instance was created
        # Extract values from the instance
        
        try:
            token  = get_token()
            name = instance.name
            email = instance.email
            subject = instance.subject if instance.subject else "No Subject"  # Handling None case
            message = instance.message

            # Call your function with dynamic values
            result = send_contact(token, name, email, subject, message)
            print(result)

        except:
            pass
