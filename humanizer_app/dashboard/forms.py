from django import forms
from django.core.exceptions import ValidationError

class WritingStyleForm(forms.Form):
    name = forms.CharField(label='Style Name', max_length=100)
    description = forms.CharField(label='Description', widget=forms.Textarea, required=False)
    text = forms.CharField(label='Text', widget=forms.Textarea)  # Assuming 'text' is a required field
    def clean_text(self):
        text = self.cleaned_data.get('text', '')

        # Check if the text is longer than 20,000 characters
        if len(text) > 20000:
            raise ValidationError('Text cannot be more than 20,000 characters.')

        return text
