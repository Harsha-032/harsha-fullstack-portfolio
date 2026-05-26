from django.db import models


class Experience(models.Model):
    EMPLOYMENT_TYPES = [
        ('full_time', 'Full Time'),
        ('internship', 'Internship'),
        ('freelance', 'Freelance'),
        ('contract', 'Contract'),
    ]

    company = models.CharField(
        max_length=255
    )

    role = models.CharField(
        max_length=255
    )

    employment_type = models.CharField(
        max_length=50,
        choices=EMPLOYMENT_TYPES,
    )

    location = models.CharField(
        max_length=255
    )

    start_date = models.DateField()

    end_date = models.DateField(
        null=True,
        blank=True,
    )

    current = models.BooleanField(
        default=False
    )

    description = models.TextField()

    tech_used = models.CharField(
        max_length=255,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"