from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserProfile(models.Model):
    # user = models.OneToOneField(AbstractUser, on_delete=models.CASCADE)
    oauth_app = models.CharField(max_length=200)
    display_name = models.CharField(max_length=2000, unique=True, blank=False, null=False)
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    profile_set = models.BooleanField(default=False)

    def __str__(self):
        return self.display_name

class UserToken(models.Model):

    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=2000)
    refresh_token = models.CharField(max_length=2000)
    expires_in = models.DateTimeField()

    def __str__(self):
        return self.user_profile.display_name

class BlackListedToken(models.Model):
    token = models.CharField(max_length=2000)