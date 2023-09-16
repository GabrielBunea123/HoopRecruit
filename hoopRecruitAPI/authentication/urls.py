from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url-spotify', AuthURLSpotify.as_view(), name='auth_url_spotify'),
    path('spotify-callback', SpotifyCallback.as_view()),
    path('refresh-spotify-access-token', RefreshSpotifyAccessToken.as_view(), name="refresh_spotify_access_token"),
    
    path('get-auth-url-strava', AuthURLStrava.as_view(), name='auth_url_strava'),
    path('strava-callback', StravaCallback.as_view()),
    path('refresh-strava-access-token', RefreshStravaAccessToken.as_view(), name="refresh_strava_access_token"),

    path('get-users', GetUsers.as_view(), name="get_users"),
    path('get-user', GetUser.as_view(), name="get_user"),
    path('logout', Logout.as_view(), name="logout")
]
