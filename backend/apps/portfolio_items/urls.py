from django.urls import path

from .views import *


urlpatterns = [
    path(
        '',
        PortfolioItemListAPIView.as_view(),
        name='portfolio-item-list',
    ),
    path(
        '<slug:slug>/',
        PortfolioItemDetailAPIView.as_view(),
        name='portfolio-item-detail',
    ),
]