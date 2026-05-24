from django.test import SimpleTestCase

from .serializers import TechStackSerializer


class TechStackSerializerTests(SimpleTestCase):
    def test_proficiency_cannot_be_greater_than_100(self):
        serializer = TechStackSerializer(data={
            'name': 'React',
            'category': 'frontend',
            'proficiency': 150,
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn('proficiency', serializer.errors)
