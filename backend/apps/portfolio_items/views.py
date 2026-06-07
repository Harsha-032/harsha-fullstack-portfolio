from rest_framework import generics

from .models import PortfolioItem
from .pagination import PortfolioItemPagination
from .serializers import PortfolioItemSerializer


class PortfolioItemListAPIView(generics.ListAPIView):
    queryset = PortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    pagination_class = PortfolioItemPagination

    filterset_fields = ['featured']

    search_fields = [
        'title',
        'description',
        'tech_stack',
    ]

    ordering_fields = [
        'order',
        'title',
        'created_at',
    ]

class PortfolioItemDetailAPIView(
    generics.RetrieveAPIView
):
    queryset = PortfolioItem.objects.all()

    serializer_class = PortfolioItemSerializer

    lookup_field = 'slug'