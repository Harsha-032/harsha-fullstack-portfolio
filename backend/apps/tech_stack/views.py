from rest_framework import generics

from .models import TechStack
from .serializers import TechStackSerializer


class TechStackListAPIView(generics.ListAPIView):
    queryset = TechStack.objects.all()

    serializer_class = TechStackSerializer

    filterset_fields = ['category']

    search_fields = ['name']

    ordering_fields = [
        'name',
        'proficiency',
        'created_at',
    ]