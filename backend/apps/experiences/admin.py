from django.contrib import admin

from .models import Experience


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        'company',
        'role',
        'employment_type',
        'current',
        'start_date',
    )

    search_fields = (
        'company',
        'role',
    )

    list_filter = (
        'employment_type',
        'current',
    )