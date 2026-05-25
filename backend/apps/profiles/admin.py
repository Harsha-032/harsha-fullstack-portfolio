from django.contrib import admin

from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'headline',
        'location',
        'availability_status',
        'updated_at',
    )

    search_fields = (
        'full_name',
        'headline',
        'location',
    )

    readonly_fields = (
        'created_at',
        'updated_at',
    )
