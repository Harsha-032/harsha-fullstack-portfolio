from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)
urlpatterns = [
    path('admin/', admin.site.urls),

    path(
        'api/portfolio-items/',
        include('apps.portfolio_items.urls'),
    ),
    path(
        'api/tech-stack/',
        include('apps.tech_stack.urls'),
    ),
    path(
        'api/profile/',
        include('apps.profiles.urls'),
    ),
    path(
        'api/schema/',
        SpectacularAPIView.as_view(),
        name='schema',
    ),

    path(
        'api/docs/',
        SpectacularSwaggerView.as_view(
        url_name='schema'
        ),
        name='swagger-ui',
    ),
    path(
        'api/experiences/',
        include('apps.experiences.urls'),
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
