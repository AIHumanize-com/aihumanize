from django.shortcuts import render
from django.contrib.auth.views import PasswordResetView
from django.urls import reverse_lazy
# Create your views here.
from allauth.account.views import PasswordResetView
from allauth.account.adapter import get_adapter
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from allauth.account.views import SignupView
from django.core.exceptions import ValidationError
from allauth.account.models import EmailAddress
from allauth.account.utils import send_email_confirmation
from .forms import CustomSignupForm
from django.utils import timezone
from common.helpers import anonymous_required

User = get_user_model()

@anonymous_required(redirect_to='admin:index')
def signup_view(request):
    if request.method == 'POST':
        form = CustomSignupForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password1']
            user, created = User.objects.get_or_create(email=email)
            user.set_password(password)
            user.is_active = False  # User will be activated after email confirmation
            user.save()


            # EmailAddress.objects.add_email(request, user, email, confirm=True)
            send_email_confirmation(request, user, signup=True)

            request.session['email_for_verification'] = email
            if 'password_reset_email' in request.session:
                del request.session['password_reset_email']
            # messages.success(request, 'Registration successful! Please check your email to complete the verification process.')
            return redirect('account_email_verification_sent')
    else:
        form = CustomSignupForm()
    return render(request, 'account/signup.html', {'form': form})


class CustomPasswordResetView(PasswordResetView):
    success_url = reverse_lazy('account_reset_password_done')

    def form_valid(self, form):
        # Set the email in the session
        self.request.session['password_reset_email'] = form.cleaned_data['email']
        if 'email_for_verification' in self.request.session:
            del self.request.session['email_for_verification']
        return super().form_valid(form)
    
    def get_context_data(self, **kwargs):
        # Get the existing context data from the superclass
        context = super().get_context_data(**kwargs)
        
        # Add your custom context data
        context['key'] = "PASSWORD RESET IS PROCESSING"
        return context
    

@anonymous_required(redirect_to='admin:index')
def resend_email_confirmation(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
            if not user.is_active:
                try:
                    email_address = EmailAddress.objects.get(user=user, email=email)
                    send_email_confirmation(request, user, email_address.email)
                    messages.success(request, 'Verification email has been resent.')
                except EmailAddress.DoesNotExist:
                    messages.error(request, 'Email address not found.')
            else:
                messages.info(request, 'This account is already active.')
        except User.DoesNotExist:
            messages.error(request, 'User not found.')
        return render(request, "account/verification_sent.html")

    return render(request, "account/verification_sent.html")