# Local Development

## Prerequisites

Backend:

- Python
- Django
- Django REST Framework
- SQLite for local development

Frontend:

- Node.js
- npm
- Vite
- React

## Backend Setup

From the project root:

```bash
cd backend
source venv/bin/activate
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000/
```

Useful URLs:

```text
http://127.0.0.1:8000/admin/
http://127.0.0.1:8000/api/portfolio-items/
http://127.0.0.1:8000/api/tech-stack/
http://127.0.0.1:8000/api/schema/
http://127.0.0.1:8000/api/docs/
```

## API Documentation

OpenAPI schema:

```text
http://127.0.0.1:8000/api/schema/
```

Swagger UI:

```text
http://127.0.0.1:8000/api/docs/
```

Use Swagger UI to inspect endpoints, query parameters, response shapes, and serializer-driven API documentation during backend development.

## Frontend Setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173/
```

## Local Data

SQLite is used locally:

```text
backend/db.sqlite3
```

This file should not be committed. The schema is represented by migrations.

## Current Local API Base URL

The frontend API service currently uses:

```js
const BASE_URL = 'http://127.0.0.1:8000/api'
```

Future production hardening should move this into environment configuration.

## Known Development Warning

`django-ckeditor` currently prints a warning about CKEditor 4 support status.

This warning does not currently fail tests, but it should be addressed before production deployment by evaluating CKEditor 5 or another supported rich text option.
