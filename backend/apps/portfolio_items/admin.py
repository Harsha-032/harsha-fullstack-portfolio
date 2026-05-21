from django.contrib import admin
from .models import PortfolioItem


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'tech_stack',
        'featured',
        'created_at',
    )

    search_fields = (
        'title',
        'tech_stack',
    )

    list_filter = (
        'featured',
        'created_at',
    )