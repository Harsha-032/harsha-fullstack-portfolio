from django.db import models


class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    headline = models.CharField(max_length=150)
    short_intro = models.CharField(max_length=255)
    about_description = models.TextField()
    location = models.CharField(
        max_length=100,
        blank=True
    )
    email = models.EmailField(blank=True)
    phone = models.CharField(
        max_length=30,
        blank=True
    )
    resume_url = models.URLField(blank=True)
    profile_photo = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True
    )
    hero_background = models.ImageField(
        upload_to='profiles/hero_backgrounds/',
        blank=True,
        null=True
    )
    availability_status = models.CharField(
        max_length=100,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.full_name
