from django.db import models

# Create your models here.


from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

from django.conf import settings
from django.core.validators import EmailValidator, RegexValidator

# Create your models here.


class LowercaseEmailField(models.EmailField):
    def pre_save(self, model_instance, add):
        email = getattr(model_instance, self.attname)
        email_lower = email.lower() if email else email
        setattr(model_instance, self.attname, email_lower)
        return email_lower


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
       
            raise ValueError("Users must have a email")
        user = self.model(email=email)
        user.set_password(password)
        
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user




class UserModel(AbstractBaseUser, PermissionsMixin):
    email = LowercaseEmailField(
        max_length=64, validators=[EmailValidator], blank=False, unique=True
    )
    
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    user_registered_at = models.DateTimeField(auto_now_add=True)
    fullname = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    default_payment_method = models.CharField(max_length=100, blank=True, null=True)
    does_email_receive = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    objects = UserManager()

    def __str__(self):
        return self.email


