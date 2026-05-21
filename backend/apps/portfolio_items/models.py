from django.db import models
from ckeditor.fields import RichTextField


class PortfolioItem(models.Model):
    title = models.CharField(max_length=100)
    description = RichTextField()
    tech_stack = models.CharField(max_length=255)

    github_url = models.URLField()
    live_url = models.URLField(blank=True)

    image = models.ImageField(
        upload_to='portfolio_items/',
        blank=True,
        null=True
    )

    featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title