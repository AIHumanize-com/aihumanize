from django.contrib import admin
from .models import Documents, EmailCampaign,WritingStyle, StylePurchase
# Register your models here.
admin.site.register(Documents)
admin.site.register(EmailCampaign)
admin.site.register(WritingStyle)
admin.site.register(StylePurchase)


