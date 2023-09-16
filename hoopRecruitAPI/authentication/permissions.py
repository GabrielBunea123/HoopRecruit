from rest_framework import permissions
from .models import *
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.utils import timezone


class AccessTokenPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            access_token = request.META.get("HTTP_AUTHORIZATION").split(' ')[1]
        except (IndexError, AttributeError):
            raise PermissionDenied("Access token missing or improperly formatted")

        try:
            user_token = UserToken.objects.get(access_token=access_token)
        except UserToken.DoesNotExist:
            raise PermissionDenied("Invalid access token")

        if user_token.expires_in < timezone.now():
            raise PermissionDenied("Access token has expired")

        if BlackListedToken.objects.filter(token=access_token).exists():
            raise PermissionDenied("Access token has been blacklisted")

        return True