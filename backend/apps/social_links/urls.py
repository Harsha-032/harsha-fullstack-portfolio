from django.urls import path

from .views import SocialLinkListAPIView


urlpatterns = [
    path(
        '',
        SocialLinkListAPIView.as_view(),
        name='social-link-list',
    ),
]