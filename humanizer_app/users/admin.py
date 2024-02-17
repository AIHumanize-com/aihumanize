from django.contrib import admin
from .models import UserModel
from payments.models import  Subscription, WordCountTracker
from dashboard.models import Documents
# Inline admin for Subscription in the UserModel admin
# Inline admin for Subscription in the UserModel admin
from csvexport.actions import csvexport


class DocumentsInline(admin.TabularInline):
    model = Documents
    extra = 0
    fields = ['input_text', 'output_text', 'words_used', 'purpose', 'document_id']
    readonly_fields = ['input_text', 'output_text', 'words_used', 'purpose', 'document_id']

class SubscriptionInline(admin.TabularInline):
    model = Subscription
    extra = 0
    fields = ['id','plan_type', 'word_count', 'price_in_cents', 'start_date', 'end_date', 'actual_end_date', 'used_words', 'remaining_words']
    readonly_fields = ['id','plan_type', 'word_count', 'price_in_cents', 'start_date', 'end_date', 'actual_end_date', 'used_words', 'remaining_words']
    autocomplete_fields = ['user']
    def used_words(self, instance):
        # Access the related WordCountTracker instance and return the used words
        if hasattr(instance, 'wordcounttracker'):
            return instance.wordcounttracker.words_used
        return 'N/A'
    used_words.short_description = 'Words Used'

    def remaining_words(self, instance):
        # Access the related WordCountTracker instance and return the remaining words
        return instance.wordcounttracker.words_purchased - instance.wordcounttracker.words_used
    remaining_words.short_description = 'Words Remaining'

# Inline admin for WordCountTracker in the Subscription admin
class WordCountTrackerInline(admin.TabularInline):
    model = WordCountTracker
    extra = 0
    readonly_fields = ('words_purchased', 'words_used')

# Custom admin for the UserModel
class UserAdmin(admin.ModelAdmin):
    inlines = [SubscriptionInline, DocumentsInline]
    list_display = ('email', 'fullname', 'is_active')
    search_fields = ('email',)
    actions = [csvexport]

    class SubscriptionTypeListFilter(admin.SimpleListFilter):
        title = 'subscription type'
        parameter_name = 'subscription_type'

        def lookups(self, request, model_admin):
            return [
                (Subscription.MONTHLY, 'Monthly'),
                (Subscription.YEARLY, 'Yearly'),
                (Subscription.ENTERPRISE, 'Enterprise'),
                (Subscription.FREE, 'Free'),
            ]

        def queryset(self, request, queryset):
            if self.value():
                return queryset.filter(subscription__plan_type=self.value())
            return queryset

    list_filter = (SubscriptionTypeListFilter,)

# Custom admin for the Subscription model
class SubscriptionAdmin(admin.ModelAdmin):
    list_per_page = 600
    inlines = [WordCountTrackerInline] 
    list_display = ('id', 'user', 'plan_type', 'start_date', 'end_date')
    list_display_links = ('id', 'plan_type', 'user')  # Making 'user' and 'plan_type' clickable

    search_fields = ('user__email',)
    actions = [csvexport]

# Register your custom admin classes
admin.site.register(UserModel, UserAdmin)
admin.site.register(Subscription, SubscriptionAdmin)