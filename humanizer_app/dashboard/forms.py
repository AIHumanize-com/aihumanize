from django import forms

class WritingStyleForm(forms.Form):
    name = forms.CharField(label='Style Name', max_length=100)
    description = forms.CharField(label='Description', widget=forms.Textarea, required=False)
    text = forms.CharField(label='Text', widget=forms.Textarea)  # Assuming 'text' is a required field
