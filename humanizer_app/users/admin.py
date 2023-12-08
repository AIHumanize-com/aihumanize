from django.contrib import admin
from .models import UserModel
from payments.models import  Subscription, WordCountTracker
# Inline admin for Subscription in the UserModel admin
class SubscriptionInline(admin.TabularInline):
    model = Subscription
    extra = 0
    readonly_fields = ['plan_type', 'word_count', 'price_in_cents', 'start_date', 'end_date', 'actual_end_date']

# Inline admin for WordCountTracker in the Subscription admin
class WordCountTrackerInline(admin.TabularInline):
    model = WordCountTracker
    extra = 0
    readonly_fields = ('words_purchased', 'words_used', 'words_remaining')

# Custom admin for the UserModel
class UserAdmin(admin.ModelAdmin):
    inlines = [SubscriptionInline]
    list_display = ('email', 'fullname', 'is_active')
    search_fields = ('email',)

    # Custom filter for filtering users by subscription type
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
    inlines = [WordCountTrackerInline]
    list_display = ('user', 'plan_type', 'start_date', 'end_date')
    search_fields = ('user__email',)

# Register your custom admin classes
admin.site.register(UserModel, UserAdmin)
admin.site.register(Subscription, SubscriptionAdmin)