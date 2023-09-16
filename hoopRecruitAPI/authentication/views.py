from django.shortcuts import render, redirect
from .serializers import *
from .utils import *
from .models import *
from .permissions import *
from requests import Request, post
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from decouple import config
import base64

SPOTIFY_CLIENT_ID = config('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = config('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI_SPOTIFY = config('REDIRECT_URI_SPOTIFY')

STRAVA_CLIENT_ID = config('STRAVA_CLIENT_ID')
STRAVA_CLIENT_SECRET = config('STRAVA_CLIENT_SECRET')
REDIRECT_URI_STRAVA = config('REDIRECT_URI_STRAVA')

FRONTEND_BASE_URL = config('FRONTEND_BASE_URL')
ERROR_REDIRECT_URL = config('ERROR_REDIRECT_URL')

# Create your views here.


class AuthURLSpotify(APIView):
    def get(self, request, format=None):
        # initialize the scopes of the user and redirect the user to the spotify authentication page
        scopes = ['user-read-email', 'user-read-private',
                  'playlist-modify-public']
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI_SPOTIFY,
            'client_id': SPOTIFY_CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

class SpotifyCallback(APIView):

    def get(self, request):
        try:
            code = request.GET.get('code')

            encoded_credentials = base64.b64encode(
                f'{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}'.encode('utf-8')).decode('utf-8')

            data = request_spotify_token(
                code=code, redirect_uri=REDIRECT_URI_SPOTIFY, encoded_credentials=encoded_credentials)

            access_token = data.get('access_token')
            refresh_token = data.get('refresh_token')
            expires_in = data.get('expires_in')

            get_spotify_profile(access_token, refresh_token, expires_in)

            print(data.get('oauth'))

            response = Response(AuthSerializer(
                data).data, status=status.HTTP_200_OK)

            response.set_cookie(
                "refresh_token", str(refresh_token), httponly=True, secure=True, samesite='Strict', max_age=24*24*60*1000)

            return response

        except Exception as e:
        # Handle the error gracefully
            error_message = f"An error occurred: {str(e)}"
            return Response({"Error":error_message}, status=status.HTTP_400_BAD_REQUEST)



class RefreshSpotifyAccessToken(APIView):

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token is not None:

            encoded_credentials = base64.b64encode(
                f'{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}'.encode('utf-8')).decode('utf-8')

            data = refresh_spotify_token(
                refresh_token=refresh_token, encoded_credentials=encoded_credentials)

            access_token = UserToken.objects.filter(refresh_token = refresh_token)[0].access_token

            if access_token:

                blacklisted_token = BlackListedToken(token=access_token)
                blacklisted_token.save()

            response = Response(AuthSerializer(data).data,
                                status=status.HTTP_200_OK)
            response.set_cookie("refresh_token", str(
                data.get('refresh_token')), httponly=True, samesite=None, max_age=24*24*60*1000)

            return response
        return Response({"Bad request": "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


class AuthURLStrava(APIView):
    def get(self, request, format=None):
        # initialize the scopes of the user and redirect the user to the strava authentication page
        scopes = 'read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write'
        url = Request('GET', 'https://www.strava.com/oauth/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI_STRAVA,
            'client_id': STRAVA_CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

class StravaCallback(APIView):
    
    def get(self, request):

        try:
            code = request.GET.get('code')

            data = request_strava_token(
                code=code, redirect_uri=REDIRECT_URI_STRAVA, client_id=STRAVA_CLIENT_ID, client_secret=STRAVA_CLIENT_SECRET)

            refresh_token = data.get('refresh_token')

            response = Response(AuthSerializer(
                data).data, status=status.HTTP_200_OK)

            response.set_cookie(
                "refresh_token", str(refresh_token), httponly=True, secure=True, samesite='Strict', max_age=24*24*60*1000)

            return response

        except Exception as e:
            # Handle the error gracefully
            error_message = f"An error occurred: {str(e)}"
            return Response({"Error":error_message}, status=status.HTTP_400_BAD_REQUEST)


class RefreshStravaAccessToken(APIView):

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token is not None:

            data = refresh_strava_token(
                client_id=STRAVA_CLIENT_ID, client_secret=STRAVA_CLIENT_SECRET, refresh_token=refresh_token)
            
            access_token = UserToken.objects.filter(refresh_token = refresh_token)[0].access_token

            if access_token:

                blacklisted_token = BlackListedToken(token=access_token)
                blacklisted_token.save()

            response = Response(AuthSerializer(data).data,
                                status=status.HTTP_200_OK)

            response.set_cookie("refresh_token", str(
                data.get('refresh_token')), httponly=True, samesite=None, max_age=24*24*60*1000)

            return response
        return Response({"Bad request": "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        access_token = UserToken.objects.filter(refresh_token = refresh_token)[0].access_token

        if access_token:
            blacklisted_token = BlackListedToken(token=access_token)
            blacklisted_token.save()

        blacklist_refresh_token = BlackListedToken(token=refresh_token)
        blacklist_refresh_token.save()

        response = Response({'Logged out': "true"}, status=status.HTTP_200_OK)
        response.set_cookie("refresh_token", "", samesite=None, httponly=True)

        return response


class GetUsers(APIView):

    permission_classes = [AccessTokenPermission]

    def get(self, request, format=None):

        users = UserProfile.objects.all()
        return Response(UserSerializer(users, many=True).data, status=status.HTTP_200_OK)


class GetUser(APIView):

    def get(self, request, format=None):
        access_token = request.META.get("HTTP_AUTHORIZATION").split(' ')[1]
        try:
            user_token = UserToken.objects.get(access_token=access_token)
        except UserToken.DoesNotExist:
            return Response({"404": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(UserSerializer(user_token.user_profile).data)
