from django.urls import path

from .views import ExperienceListAPIView


urlpatterns = [
    path(
        '',
        ExperienceListAPIView.as_view(),
        name='experience-list',
    ),
]