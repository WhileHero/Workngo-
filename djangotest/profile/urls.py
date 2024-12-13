from django.urls import path
from . import views

urlpatterns = [
    path('info/', views.profile_info, name='profile_info'),
    path('update-biography/', views.update_biography, name='update_biography'),
]