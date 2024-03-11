from django.contrib import admin
from .models import Documents, EmailCampaign,WritingStyle, StylePurchase
# Register your models here.

class WritingStyleAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'status', 'created_at', 'updated_at']
    search_fields = ['user__email']  # Search by user email
    autocomplete_fields = ['user']  # Autocomplete field for user


class DocumentsAdmin(admin.ModelAdmin):
    list_display = ['user', 'model']
    search_fields = ['user__email']  # Search by user email
    autocomplete_fields = ['user']  # Autocomplete field for user


admin.site.register(Documents, DocumentsAdmin)
admin.site.register(EmailCampaign)
admin.site.register(WritingStyle, WritingStyleAdmin)
admin.site.register(StylePurchase)


