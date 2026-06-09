# Architecture Overview

## Project Purpose

The project is a professional-grade full-stack portfolio application designed to showcase engineering skills by using real-world architectural patterns:

- **Strict Responsibility Separation**: A decoupling of data storage, serialization, and presentation.
- **Modular Django Domains**: Rather than a single massive app, features are isolated into clean, single-responsibility modules.
- **API Contracts**: Dynamically generated OpenAPI 3.0 schemas and interactive Swagger UI rather than manual docs.
- **Polished Frontend Presentation**: A highly interactive React application utilizing WebGL, Framer Motion, and robust asynchronous data handling (loading, error, and empty states).

---

## Repository Layout

```text
harsha-fullstack-portfolio/
├── backend/                  # Django REST Framework application
│   ├── apps/                 # Domain-Specific Applications
│   │   ├── portfolio_items/  # [Active] Projects data and filtering APIs
│   │   ├── tech_stack/       # [Active] Technology stack inventory APIs
│   │   ├── profiles/         # [Active] About bio and resume files APIs
│   │   ├── experiences/      # [Active] Career history timeline APIs
│   │   ├── social_links/     # [Active] Social link directory APIs
│   │   ├── inquiries/        # [Active] Contact message receiver APIs
│   │   ├── work_history/     # [Skeleton] Placeholder
│   │   └── academics/        # [Skeleton] Placeholder
│   ├── portfolio/            # Core settings, URL routing, and WSGI/ASGI configs
│   ├── media/                # Local media files (development override)
│   ├── staticfiles/          # Collected static assets (for production serving)
│   └── manage.py
├── frontend/                 # React & Vite client
│   ├── src/
│   │   ├── components/       # Core UI and canvas components
│   │   │   ├── canvas/       # WebGL particles, custom shaders, and scenes
│   │   │   └── common/       # Cursor trackers, Navbar, and Terminals
│   │   ├── sections/         # Landing page modular screen sections
│   │   ├── services/         # Axios API connection endpoints
│   │   ├── hooks/            # Custom utility hooks (theme, media queries)
│   │   └── utils/            # Helper functions for URL resolution and animation
│   └── package.json
└── docs/                     # System design and developer guides
```

---

## Backend Architecture

The Django backend is structured into modular applications to separate concerns and ensure high maintainability:

1. **`portfolio_items`**: Handles data for portfolio projects. Supports search, sorting, and cursor-like featured project filters. Uses CKEditor for rich-text HTML descriptions.
2. **`tech_stack`**: Manages developer skills, categorization (frontend, backend, cloud, etc.), sorting order, and icon mapping.
3. **`profiles`**: Exposes personal bio details, current location, email address, avatar photo, and resume documents.
4. **`experiences`**: Stores professional roles, employment type categorization, start/end dates, and text descriptions of responsibilities.
5. **`social_links`**: Tracks social handles, ordering, and profile links.
6. **`inquiries`**: Receptive API that processes contact message payloads.

### Standard Backend Request Flow
```text
HTTP Client Request
  → django.middleware (Security, CORS, Session)
  → urlconf (portfolio.urls)
  → app urls (e.g. apps.portfolio_items.urls)
  → drf view (e.g. generics.ListAPIView)
  → serializer (validates and formats payload)
  → django models (fetches from Neon Postgres database)
  → HTTP Response
```

---

## Frontend Architecture

The frontend is a single-page application (SPA) built using React, Vite, and Tailwind CSS. The design system is highly interactive, pulling dynamic data from the backend APIs on load.

### Core Architecture Layers:
- **Presentation Section Layer (`src/sections/`)**: Large, full-screen components containing layouts for About, Experience, Projects, Skills, and Contact.
- **Reusable Component Layer (`src/components/`)**: Functional UI items such as the terminal modal simulator, smooth scroll wrappers, and custom cursor trackers.
- **WebGL Canvas Layer (`src/components/canvas/` & `src/components/Landscape3D.jsx`)**: Renders reactive Three.js environments (particle structures, abstract terrains) synchronized with the scroll progress to create a high-end visual experience.
- **Service Layer (`src/services/portfolioApi.js`)**: An Axios-based API client that maps to the backend API endpoints. It resolves environment-specific API hosts via `import.meta.env.VITE_API_BASE_URL`.

### Frontend Data Binding Layout
```text
portfolioApi.js
  → App.jsx (useApi hook manages loading, error, and resolved data)
  → Section Components (Hero, About, Experience, Skills, Projects, Contact)
  → Child UI Cards & Layouts
```

---

## API Design & Schema Setup

The backend follows RESTful API design principles:
- **Read-Only List views**: Use DRF generic views (`generics.ListAPIView`) with pagination enabled for large collections (e.g., portfolio items).
- **Serializer-Driven Validation**: All input validation is handled at the serializer level (e.g., rejecting empty rich text or out-of-range proficiency ratings).
- **Auto-Generating Contracts**: `drf-spectacular` is configured as the default schema class. It dynamically reads DRF views, query parameter annotations, and serializer validators to build an OpenAPI 3.0 specification.
- **API Documentation**: The OpenAPI schema is served at `/api/schema/` and is rendered visually via Swagger UI at `/api/docs/`.

---

## Database & Media Infrastructure

### Database Topology:
- **Neon Serverless PostgreSQL**: The main database used for local development and production environments. It is connected via standard PG environment variables (`PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`) loaded from the `.env` file.
- **SQLite Database**: A separate SQLite database (`db.sqlite3`) is strictly reserved for running automated testing (`python manage.py test`). This keeps test mutations isolated from the local database instance and guarantees rapid test execution.

### Static & Media File Pipeline:
- **Cloudinary Storage**: Integrated via `django-cloudinary-storage` for production deployments. Avatars, resumes, and project screenshots uploaded via the Django Admin panel are directly stored on Cloudinary.
- **WhiteNoise Middleware**: Handles high-performance static asset hosting (compiled CSS/JS, admin UI assets) directly within the Django server process in production, removing the need for an external Nginx static proxy.
- **URL Resolution Helper**: The frontend uses `resolveImageUrl` (`src/utils/helpers.js`) to seamlessly handle different image URLs (e.g., parsing Cloudinary media paths, local fallback paths, or external image links).

---

## Design and Technical Tradeoffs

1. **Rich Text Injection**: The portfolio description fields use CKEditor HTML strings. These are rendered in the React frontend using `dangerouslySetInnerHTML`. To mitigate XSS risks, custom Django serializers strip malicious script elements, and the editor is restricted to the Django admin panel.
2. **Formspree vs Inquiries API**: Currently, the contact form submits to Formspree for rapid prototyping. However, an inquiries Django app is already implemented to store inquiries in the database. A future roadmap task is migrating the frontend to target the local inquiries endpoint.
3. **No Frontend Auth**: The portfolio data is read-only for public visitors, and updates are handled solely via the secure Django Admin dashboard. This eliminates the complexity of JWT/Session authentication on the public React frontend.
