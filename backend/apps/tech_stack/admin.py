from django.contrib import admin

from .models import TechStack


@admin.register(TechStack)
class TechStackAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'proficiency',
    )

    list_filter = (
        'category',
    )

    search_fields = (
        'name',
    )