from django.urls import path

from .views import TechStackListAPIView


urlpatterns = [
    path(
        '',
        TechStackListAPIView.as_view(),
        name='tech-stack-list',
    ),
]