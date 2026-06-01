from django.contrib import admin

from .models import SocialLink


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = (
        'platform',
        'display_order',
        'is_active',
    )

    list_filter = (
        'is_active',
    )

    search_fields = (
        'platform',
    )