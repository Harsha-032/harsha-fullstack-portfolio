from rest_framework import generics

from .models import TechStack
from .serializers import TechStackSerializer


class TechStackListAPIView(generics.ListAPIView):
    queryset = TechStack.objects.all()
    serializer_class = TechStackSerializer