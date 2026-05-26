from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import Experience
from .serializers import ExperienceSerializer


class ExperienceListAPIView(generics.ListAPIView):
    queryset = Experience.objects.all()

    serializer_class = ExperienceSerializer

    filterset_fields = [
        'employment_type',
        'current',
    ]

    search_fields = [
        'company',
        'role',
    ]

    ordering_fields = [
        'start_date',
        'company',
    ]