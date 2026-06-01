from django.db import models


class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('leetcode', 'LeetCode'),
        ('hackerrank', 'HackerRank'),
        ('email', 'Email'),
        ('resume', 'Resume'),
    ]

    platform = models.CharField(
        max_length=50,
        choices=PLATFORM_CHOICES,
        unique=True
    )

    url = models.URLField()

    display_order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.get_platform_display()