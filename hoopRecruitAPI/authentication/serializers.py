from rest_framework import serializers
from .models import *

class AuthCodeSerializer(serializers.Serializer):
    code = serializers.CharField()
    grant_type = serializers.CharField()

class AuthSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    refresh_token = serializers.CharField()
    expires_in = serializers.IntegerField()
    oauth = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        depth = 1