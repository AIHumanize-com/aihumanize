from celery import shared_task
from django.db import transaction
from .models import Documents
from payments.models import WordCountTracker
from django.db.models import F
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
