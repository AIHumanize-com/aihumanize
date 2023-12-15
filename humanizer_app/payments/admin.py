from django.contrib import admin
from .models import Subscription, WordCountTracker
# Register your models here.
# admin.site.register(Subscription)
# admin.site.register(WordCountTracker)
class WordCountTrackerAdmin(admin.ModelAdmin):
    search_fields = ['subscription__user__email']
    list_filter = ('words_purchased', 'words_used')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('subscription__user')

admin.site.register(WordCountTracker, WordCountTrackerAdmin)