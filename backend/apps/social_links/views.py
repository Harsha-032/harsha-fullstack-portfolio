from rest_framework import generics

from .models import SocialLink
from .serializers import SocialLinkSerializer


class SocialLinkListAPIView(
    generics.ListAPIView
):
    queryset = SocialLink.objects.filter(
        is_active=True
    )

    serializer_class = SocialLinkSerializer

    filterset_fields = [
        'platform',
    ]

    ordering_fields = [
        'display_order',
    ]