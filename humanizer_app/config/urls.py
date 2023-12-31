"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from users.views import CustomPasswordResetView, signup_view,resend_email_confirmation
from django.conf.urls import handler404
from blog.views import article
from django.conf.urls.static import static
from django.conf import settings

handler404 = 'front.views.view_404'

urlpatterns = [
    path("admin/", admin.site.urls),
    # path('accounts/password/reset/', CustomPasswordResetView.as_view(), name='account_reset_password'),
    path('accounts/signup/', signup_view, name='account_signup'),
    path('accounts/', include('allauth.urls')),
    path('accounts/password/reset/done/', CustomPasswordResetView.as_view(), name='account_reset_password_done'),
    path('accounts/resend-email-confirmation/signup/', resend_email_confirmation, name='resend_email_confirmation'),
    path("dashboard/", include("dashboard.urls")),
    path("payments/", include("payments.urls")),
    path("ckeditor5/", include('django_ckeditor_5.urls'), name="ck_editor_5_upload_file"),
    path("blog/", include("blog.urls")),
    
    path("", include("front.urls")),


    # path("users/", include("users.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
