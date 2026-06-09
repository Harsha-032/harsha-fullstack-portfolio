# API Reference

The project API is built using Django REST Framework (DRF) and serves as the data layer for the frontend React client.

## Base URL Configuration

In local development, the API is available at:
```text
http://127.0.0.1:8000/api
```

In production, the base URL is configured on the frontend using the `VITE_API_BASE_URL` environment variable.

---

## Interactive API Documentation

Interactive API documents are generated automatically via `drf-spectacular`:

- **OpenAPI 3.0 Schema**: `http://127.0.0.1:8000/api/schema/` (JSON representation)
- **Swagger UI**: `http://127.0.0.1:8000/api/docs/` (Interactive test interface)

The backend schema configuration is defined in the `REST_FRAMEWORK` settings:
```python
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
```

---

## API Endpoints

### 1. Portfolio Items
Returns list of projects and case studies.

- **Endpoint**: `GET /api/portfolio-items/`
- **Pagination**: Paginated (default page size is managed by DRF settings)
- **JSON Response Payload**:
```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Portfolio Website",
      "slug": "portfolio-website",
      "tagline": "Modern cinematic full-stack site",
      "project_period": "May 2026 - Present",
      "description": "<p>Detailed HTML description of the portfolio project.</p>",
      "tech_stack": "React, Django, Three.js",
      "github_url": "https://github.com/example/project",
      "live_url": "https://example.com",
      "image": "https://cloudinary.com/media/portfolio_items/sample.jpg",
      "featured": true,
      "order": 1,
      "created_at": "2026-05-24T00:00:00Z"
    }
  ]
}
```

- **Query Parameters**:
  - `?page=1`: Page index
  - `?featured=true`: Filter by featured projects
  - `?search=django`: Text search across title, tagline, description, and tech stack
  - `?ordering=title` or `?ordering=-created_at`: Sorting fields (supports `title`, `order`, `created_at`)

---

### 2. Tech Stack (Skills)
Returns developer skills grouped by logical technology categories.

- **Endpoint**: `GET /api/tech-stack/`
- **Pagination**: Unpaginated list
- **JSON Response Payload**:
```json
[
  {
    "id": 1,
    "name": "React",
    "category": "frontend",
    "proficiency": 90,
    "icon_name": "react",
    "icon": null,
    "order": 1,
    "created_at": "2026-05-24T00:00:00Z"
  }
]
```

- **Valid Categories**:
  - `frontend`, `backend`, `methodologies`, `tools`, `cloud`, `devops`
- **Icon Configuration**:
  - `icon_name`: Choices match a pre-defined list of SVG slug identifiers (e.g. `react`, `js`, `py`, `django`, `postgres`, `git`). The frontend uses this value to fetch custom SVGs from an external provider (`https://go-skill-icons.vercel.app/api/icons?i={icon_name}`).
  - `icon`: ImageField representing custom user-uploaded icons if not covered in the standard pre-defined choices.
- **Query Parameters**:
  - `?category=frontend`: Filter by technology category
  - `?search=react`: Text search across name
  - `?ordering=-proficiency` or `?ordering=order`: Sorting fields (supports `name`, `proficiency`, `order`, `created_at`)

---

### 3. Profile
Returns the primary bio, photo, location, and resume details of the user.

- **Endpoint**: `GET /api/profile/`
- **Pagination**: Single record retrieve (fetches the latest active record from the database)
- **JSON Response Payload**:
```json
{
  "id": 1,
  "full_name": "Harsha C",
  "headline": "Full-Stack Software Engineer",
  "short_intro": "Building high-performance interactive web products.",
  "about_description": "Passionate software engineer focused on Python/Django backends and React/WebGL frontends...",
  "location": "Singapore",
  "email": "harsha@example.com",
  "phone": "+65 1234 5678",
  "resume_url": "https://cloudinary.com/media/resumes/resume.pdf",
  "profile_photo": "https://cloudinary.com/media/profiles/avatar.jpg",
  "hero_background": null,
  "availability_status": "Open to opportunities",
  "created_at": "2026-06-01T12:00:00Z",
  "updated_at": "2026-06-09T15:30:00Z"
}
```

---

### 4. Experiences (Career Timeline)
Returns job positions and career history.

- **Endpoint**: `GET /api/experiences/`
- **Pagination**: Unpaginated list (ordered chronologically by `-start_date` by default)
- **JSON Response Payload**:
```json
[
  {
    "id": 1,
    "company": "Tech Corp",
    "role": "Software Engineer",
    "employment_type": "full_time",
    "location": "San Francisco, CA",
    "start_date": "2024-06-01",
    "end_date": null,
    "current": true,
    "description": "Led backend API refactoring and migrated frontend codebase to Vite.",
    "tech_used": "Python, Django, PostgreSQL, React, AWS",
    "created_at": "2026-06-01T12:00:00Z",
    "updated_at": "2026-06-09T15:30:00Z"
  }
]
```

- **Valid Employment Types**:
  - `full_time`, `internship`, `freelance`, `contract`
- **Query Parameters**:
  - `?employment_type=full_time`: Filter by work style
  - `?current=true`: Filter by active roles
  - `?search=tech`: Text search across company, role, description, and tech_used
  - `?ordering=start_date` or `?ordering=company`: Sorting fields

---

### 5. Social Links
Returns links to social media networks and developer platforms.

- **Endpoint**: `GET /api/social-links/`
- **Pagination**: Unpaginated list (ordered by display order)
- **JSON Response Payload**:
```json
[
  {
    "id": 1,
    "platform": "github",
    "url": "https://github.com/harsha",
    "display_order": 1,
    "is_active": true,
    "created_at": "2026-06-01T12:00:00Z"
  }
]
```

- **Valid Platforms**:
  - `github`, `linkedin`, `leetcode`, `hackerrank`, `email`, `resume`
- **Query Parameters**:
  - `?platform=github`: Filter by platform type
  - `?ordering=display_order`: Sort field

---

### 6. Inquiries
Submits contact form messages to the backend database.

- **Endpoint**: `POST /api/inquiries/`
- **Content-Type**: `application/json`
- **JSON Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hi, I would love to collaborate on a full-stack project!"
}
```

- **Validation Rules**:
  - `name`: Max 100 characters, cannot be empty.
  - `email`: Must be a valid email format, cannot be empty.
  - `message`: Cannot be empty.
- **Response Shape (Success - `201 Created`)**:
```json
{
  "id": 12,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hi, I would love to collaborate on a full-stack project!",
  "created_at": "2026-06-09T17:15:30Z"
}
```
- **Response Shape (Failure - `400 Bad Request`)**:
```json
{
  "email": [
    "Enter a valid email address."
  ]
}
```
