from rest_framework import serializers
from django.utils.html import strip_tags

from .models import PortfolioItem


class PortfolioItemSerializer(serializers.ModelSerializer):
    def validate_description(self, value):
        plain_text = strip_tags(value).strip()

        if not plain_text:
            raise serializers.ValidationError(
                'Description cannot be empty.'
            )

        return value

    class Meta:
        model = PortfolioItem
        fields = '__all__'
