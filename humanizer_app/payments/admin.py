from django.contrib import admin
from .models import Subscription, WordCountTracker
# Register your models here.
# admin.site.register(Subscription)
# admin.site.register(WordCountTracker)


class WordCountTrackerAdmin(admin.ModelAdmin):
    search_fields = ['subscription__user__email']
    autocomplete_fields = ['subscription']
    

admin.site.register(WordCountTracker, WordCountTrackerAdmin)