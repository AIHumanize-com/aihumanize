# custom_email_adapter.py

from allauth.account.adapter import DefaultAccountAdapter
from .tasks import send_email_task  # Ensure this is the correct path to your Celery task

class CeleryEmailAdapter(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        """
        Overrides the default `send_mail` method to send emails asynchronously using Celery.
        """
        msg = self.render_mail(template_prefix, email, context)
        send_email_task.delay(msg.subject, msg.body, msg.from_email, [email])
