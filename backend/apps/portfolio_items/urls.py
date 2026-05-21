from django.urls import path

from .views import PortfolioItemListAPIView


urlpatterns = [
    path(
        '',
        PortfolioItemListAPIView.as_view(),
        name='portfolio-item-list',
    ),
]