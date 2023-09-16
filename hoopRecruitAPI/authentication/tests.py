from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import UserToken, UserProfile  # Import your models
from .serializers import UserSerializer  # Import your serializer
from django.urls import reverse

class GetUserTestCase(TestCase):
    def setUp(self):
        # Create a test UserProfile and UserToken object
        self.user_profile = UserProfile.objects.create(username='test_user')
        self.user_token = UserToken.objects.create(
            user_profile=self.user_profile, access_token='test_token')

    def test_get_user(self):
        client = APIClient()

        # Set the Authorization header with the access token
        headers = {
            'HTTP_AUTHORIZATION': f'Bearer {self.user_token.access_token}'
        }

        # URL of the view
        url = reverse('get-user')

        # Perform the GET request
        response = client.get(url, **headers)

        # Assert that the response status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the returned data matches the serialized UserProfile
        expected_data = UserSerializer(self.user_profile).data
        self.assertEqual(response.data, expected_data)

    def test_get_user_with_invalid_token(self):
        client = APIClient()

        # Set an invalid access token in the Authorization header
        headers = {
            'HTTP_AUTHORIZATION': 'Bearer invalid_token'
        }

        # URL of the view
        url = reverse('get-user')

        # Perform the GET request
        response = client.get(url, **headers)

        # Assert that the response status code is 404 Not Found
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)