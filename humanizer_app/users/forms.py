from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()
from django_ckeditor_5.fields import CKEditor5Field

from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class CustomSignupForm(forms.Form):
    email = forms.EmailField()
    password1 = forms.CharField()
    password2 = forms.CharField()

    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        # Check if a user with this email already exists
        try:
            user = User.objects.get(email=email)
            # If the user exists and is active, raise a validation error
            if user.is_active:
                raise ValidationError("A user with that email already exists.")
            else:
                # User exists but is inactive, allow the process to continue
                # The view will handle resending the verification email
                return email
        except User.DoesNotExist:
            # If no user exists with this email, validation passes
            return email

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise ValidationError("The two password fields didn’t match.")

        validate_password(password1)
        return cleaned_data





