from django.urls import path
from .views import *

urlpatterns = [
    path('spotify', spotify_client_id, name='spotify_client_id')
]
