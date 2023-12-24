from django.contrib import admin
from .models import Contact, DetectRequestCounter
# Register your models here.
admin.site.register(Contact)
admin.site.register(DetectRequestCounter)