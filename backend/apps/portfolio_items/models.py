from ckeditor.fields import RichTextField
from django.db import models
from django.utils.text import slugify


class PortfolioItem(models.Model):
    title = models.CharField(
        max_length=100,
        blank=False
    )

    slug = models.SlugField(
        unique=True,
        blank=True
    )

    tagline = models.CharField(
        max_length=255,
        default=""
    )

    project_period = models.CharField(
        max_length=50,
        default=""
    )

    description = RichTextField()

    tech_stack = models.CharField(
        max_length=255,
        blank=False
    )

    github_url = models.URLField(
        blank=False
    )

    live_url = models.URLField(
        blank=True
    )

    image = models.ImageField(
        upload_to='portfolio_items/',
        blank=True,
        null=True
    )

    featured = models.BooleanField(
        default=False
    )

    order = models.IntegerField(
        default=0,
        help_text="Custom sort order. Lower numbers appear first. 0 is default."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title