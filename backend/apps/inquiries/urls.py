from django.urls import path

from .views import InquiryCreateAPIView


urlpatterns = [
    path(
        '',
        InquiryCreateAPIView.as_view(),
        name='inquiry-create',
    ),
]
