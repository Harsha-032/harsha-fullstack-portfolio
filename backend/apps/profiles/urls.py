from django.urls import path

from .views import ProfileRetrieveAPIView


urlpatterns = [
    path(
        '',
        ProfileRetrieveAPIView.as_view(),
        name='profile-detail',
    ),
]
