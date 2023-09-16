from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from decouple import config
from rest_framework.views import APIView

# CLIENT_IDS

def spotify_client_id(request):

    client_id = config('SPOTIFY_CLIENT_ID')
    return JsonResponse({'client_id': client_id})

