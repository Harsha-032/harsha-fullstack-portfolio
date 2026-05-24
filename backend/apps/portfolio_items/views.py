from rest_framework import generics

from .models import PortfolioItem
from .pagination import PortfolioItemPagination
from .serializers import PortfolioItemSerializer


class PortfolioItemListAPIView(generics.ListAPIView):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    pagination_class = PortfolioItemPagination
