from rest_framework import serializers

from .models import TechStack


class TechStackSerializer(serializers.ModelSerializer):
    def validate_proficiency(self, value):
        if value > 100:
            raise serializers.ValidationError(
                'Proficiency cannot be greater than 100.'
            )

        return value

    class Meta:
        model = TechStack
        fields = '__all__'
