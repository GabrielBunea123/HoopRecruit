from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='home'),
    path('profile', index, name='profile'),
    path('spotify-callback', index, name="spotify-callback"),
    path('strava-callback', index, name='strava-callback'),
    path('auth', index, name="authenticate"),
    path('highlight/<str:highlight_id>', index, name="highlight")
]
