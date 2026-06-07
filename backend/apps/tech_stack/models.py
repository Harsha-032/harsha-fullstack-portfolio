from django.db import models
from django.core.validators import MaxValueValidator

from .icon_choices import ICON_CHOICES

class TechStack(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('methodologies', 'Methodologies'),
        ('tools', 'Tools'),
        ('cloud', 'Cloud'),
        ('devops', 'DevOps'),
    ]
    name = models.CharField(max_length=100)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    proficiency = models.PositiveIntegerField(
        default=80,
        validators=[MaxValueValidator(100)]
    )

    icon_name = models.CharField(
        max_length=50,
        choices=ICON_CHOICES,
        default='default',
        help_text="Select a pre-defined SVG icon from skillicons.dev or LelouchFR/skill-icons. Select 'Default/Custom Icon' if not listed."
    )

    icon = models.ImageField(
        upload_to='tech_stack/',
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(
        default=0,
        help_text="Order in which this skill appears (lower numbers appear first)"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return self.name
