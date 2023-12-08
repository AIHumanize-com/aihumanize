from django.urls import path
from . import views
urlpatterns = [
    path("", views.PostList.as_view(), name="blogs"),
     path("<slug:slug>/", views.article, name="article"),
   
]
