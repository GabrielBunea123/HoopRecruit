from requests import Request, post, get
from .models import *
from django.utils import timezone

def request_spotify_token(code, redirect_uri, encoded_credentials):

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri
    }, headers={
        'Authorization': f'Basic ' + encoded_credentials,
        'Content-Type': 'application/x-www-form-urlencoded'
    }).json()

    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')

    data = {'access_token': access_token,
            'refresh_token': refresh_token, 'expires_in': expires_in, 'oauth': 'spotify'}

    return data


def get_spotify_profile(access_token, refresh_token, expires_in):

    response = get('https://api.spotify.com/v1/me', headers={
        "Accept": "application/json",
        "Authorization": f'Bearer {access_token}'
    }).json()

    email = response.get('email')
    display_name = response.get('display_name')
    oauthApp = 'spotify'

    user = UserProfile.objects.filter(display_name = display_name)

    if not user.exists():
        user = UserProfile(display_name=display_name, email=email, oauth_app=oauthApp)
        user.save()

        current_datetime = timezone.now()
        expires_in_datetime = current_datetime + timezone.timedelta(seconds=expires_in)
        userToken = UserToken(user_profile=user, access_token=access_token, refresh_token=refresh_token, expires_in = expires_in_datetime).save()
    
    else:
        current_datetime = timezone.now()
        expires_in_datetime = current_datetime + timezone.timedelta(seconds=expires_in)

        userToken = UserToken.objects.filter(user_profile = user[0])
        userToken.update(access_token = access_token, refresh_token=refresh_token, expires_in=expires_in_datetime)
        


def refresh_spotify_token(refresh_token, encoded_credentials):
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    }, headers={
        'Authorization': f'Basic ' + encoded_credentials,
        'Content-Type': 'application/x-www-form-urlencoded'
    }).json()

    access_token = response.get('access_token')
    expires_in = response.get('expires_in')

    #update user token
    current_datetime = timezone.now()
    expires_in_datetime = current_datetime + timezone.timedelta(seconds=expires_in)
    userToken = UserToken.objects.filter(refresh_token=refresh_token)
    userToken.update(access_token = access_token, refresh_token=refresh_token, expires_in=expires_in_datetime)

    data = {'access_token': access_token,
            'refresh_token': refresh_token, 'expires_in': expires_in, 'oauth': 'spotify'}
    return data


def request_strava_token(code, redirect_uri, client_id, client_secret):

    response = post('https://www.strava.com/oauth/token', data={
        'grant_type': "authorization_code",
        'code': code,
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'client_secret': client_secret
    }, headers={
        'Accept': 'application/json'
    }).json()

    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    display_name = response.get('athlete').get('username')
    oauthApp = "strava"

    user = UserProfile.objects.filter(display_name = display_name)
    
    if not user.exists(): #create the user and create his token
        user = UserProfile(display_name=display_name, oauth_app=oauthApp)
        user.save()

        current_datetime = timezone.now()
        expires_in_datetime = current_datetime + timezone.timedelta(seconds=expires_in)
        userToken = UserToken(user_profile=user, access_token=access_token, refresh_token=refresh_token, expires_in = expires_in_datetime).save()
    
    else: #update user token
        current_datetime = timezone.now()
        expires_in_datetime = current_datetime + timezone.timedelta(seconds=expires_in)

        userToken = UserToken.objects.filter(user_profile = user[0])
        userToken.update(access_token = access_token, refresh_token=refresh_token, expires_in=expires_in_datetime)

    data = {'access_token': access_token,
            'refresh_token': refresh_token, 'expires_in': expires_in, 'oauth': 'strava'}

    return data


def refresh_strava_token(client_id, client_secret, refresh_token):
    response = post('https://www.strava.com/oauth/token', data={
        'grant_type': 'refresh_token',
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token':refresh_token
    }, headers={
        'Accept': 'application/json'
    }).json()

    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')

    #update user token
    current_datetime = timezone.now()
    expires_in_datetime = current_datetime + timezone.timedelta(seconds=expires_in)
    userToken = UserToken.objects.filter(refresh_token=refresh_token)
    userToken.update(access_token = access_token, refresh_token=refresh_token, expires_in=expires_in_datetime)

    data = {'access_token': access_token,
            'refresh_token': refresh_token, 'expires_in': expires_in, 'oauth': 'strava'}
    return data
