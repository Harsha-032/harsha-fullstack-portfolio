from django.test import SimpleTestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import PortfolioItem
from .serializers import PortfolioItemSerializer


class PortfolioItemSerializerTests(SimpleTestCase):
    def test_description_cannot_be_empty_rich_text(self):
        serializer = PortfolioItemSerializer(data={
            'title': 'Portfolio Website',
            'description': '<p><br></p>',
            'tech_stack': 'React, Django',
            'github_url': 'https://github.com/example/project',
            'live_url': '',
            'featured': True,
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn('description', serializer.errors)


class PortfolioItemAPITests(APITestCase):
    def test_list_returns_paginated_response_shape(self):
        PortfolioItem.objects.create(
            title='Portfolio Website',
            description='<p>Full-stack portfolio project.</p>',
            tech_stack='React, Django',
            github_url='https://github.com/example/project',
            featured=True,
        )

        response = self.client.get(
            reverse('portfolio-item-list')
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)
        self.assertIsInstance(response.data['results'], list)

    def test_list_can_filter_featured_projects(self):
        PortfolioItem.objects.create(
            title='Featured Project',
            description='<p>Featured project description.</p>',
            tech_stack='React, Django',
            github_url='https://github.com/example/featured',
            featured=True,
        )
        PortfolioItem.objects.create(
            title='Regular Project',
            description='<p>Regular project description.</p>',
            tech_stack='Python',
            github_url='https://github.com/example/regular',
            featured=False,
        )

        response = self.client.get(
            reverse('portfolio-item-list'),
            {'featured': 'true'}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(
            response.data['results'][0]['title'],
            'Featured Project'
        )

    def test_list_can_search_projects(self):
        PortfolioItem.objects.create(
            title='Portfolio API',
            description='<p>Django REST Framework project.</p>',
            tech_stack='Django, React',
            github_url='https://github.com/example/api',
            featured=True,
        )
        PortfolioItem.objects.create(
            title='Frontend Dashboard',
            description='<p>Dashboard interface.</p>',
            tech_stack='React',
            github_url='https://github.com/example/dashboard',
            featured=False,
        )

        response = self.client.get(
            reverse('portfolio-item-list'),
            {'search': 'django'}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(
            response.data['results'][0]['title'],
            'Portfolio API'
        )
