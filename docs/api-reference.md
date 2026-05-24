# API Reference

Base API URL in local development:

```text
http://127.0.0.1:8000/api
```

Swagger docs:

```text
http://127.0.0.1:8000/api/docs/
```

OpenAPI schema:

```text
http://127.0.0.1:8000/api/schema/
```

## OpenAPI And Swagger Setup

The project uses `drf-spectacular` for OpenAPI schema generation and Swagger UI.

Installed apps include:

```python
'drf_spectacular'
```

DRF is configured to use `drf_spectacular.openapi.AutoSchema`:

```python
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': (
        'drf_spectacular.openapi.AutoSchema'
    ),
}
```

Project metadata is configured through `SPECTACULAR_SETTINGS`:

```python
SPECTACULAR_SETTINGS = {
    'TITLE': 'Harsha Portfolio API',
    'DESCRIPTION': (
        'Full-stack portfolio backend APIs built with '
        'Django REST Framework'
    ),
    'VERSION': '1.0.0',
}
```

Schema and Swagger URLs are registered in `backend/portfolio/urls.py`:

```python
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
```

This gives two professional API documentation surfaces:

- `/api/schema/`: machine-readable OpenAPI schema
- `/api/docs/`: human-friendly Swagger UI

## Portfolio Items

Endpoint:

```text
GET /api/portfolio-items/
```

Purpose:

Returns portfolio projects.

Response shape:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Portfolio Website",
      "description": "<p>Full-stack portfolio project.</p>",
      "tech_stack": "React, Django",
      "github_url": "https://github.com/example/project",
      "live_url": "",
      "image": null,
      "featured": true,
      "created_at": "2026-05-24T00:00:00Z"
    }
  ]
}
```

Supported query parameters:

```text
?page=1
?page_size=3
?featured=true
?search=django
?ordering=title
?ordering=-created_at
```

Examples:

```text
GET /api/portfolio-items/?featured=true
GET /api/portfolio-items/?search=react
GET /api/portfolio-items/?ordering=-created_at
GET /api/portfolio-items/?page=2
```

Important contract:

The frontend depends on the paginated response shape:

```text
count
next
previous
results
```

## Tech Stack

Endpoint:

```text
GET /api/tech-stack/
```

Purpose:

Returns skills and technologies grouped by the frontend using `category`.

Example response:

```json
[
  {
    "id": 1,
    "name": "React",
    "category": "frontend",
    "proficiency": 90,
    "icon": null,
    "created_at": "2026-05-24T00:00:00Z"
  }
]
```

Supported categories:

```text
frontend
backend
database
tools
cloud
```

Supported query parameters:

```text
?category=frontend
?search=react
?ordering=name
?ordering=-proficiency
?ordering=created_at
```

Examples:

```text
GET /api/tech-stack/?category=frontend
GET /api/tech-stack/?search=react
GET /api/tech-stack/?ordering=-proficiency
```

Validation:

- `proficiency` must not exceed `100`.
- `proficiency` is stored as a positive integer.

## Current API Notes

- Portfolio items are paginated.
- Tech stack is not currently paginated.
- Both active APIs are read-only list endpoints.
- Create/update/delete APIs are not implemented yet.
