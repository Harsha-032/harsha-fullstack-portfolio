from rest_framework import generics

from .models import Profile
from .serializers import ProfileSerializer


class ProfileRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.latest('updated_at')
