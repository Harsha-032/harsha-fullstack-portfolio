# Architecture Overview

## Project Purpose

The project is a portfolio application used as a learning platform for full-stack software engineering.

The goal is not only to display portfolio content. The deeper goal is to build the project like a real product:

- separate backend and frontend responsibilities
- keep APIs documented and testable
- use modular Django apps
- keep React UI organized by sections, components, and services
- generate OpenAPI schema and Swagger documentation from the backend

## Repository Layout

```text
harsha-fullstack-portfolio/
├── backend/
│   ├── apps/
│   │   ├── portfolio_items/
│   │   ├── tech_stack/
│   │   ├── profiles/
│   │   ├── work_history/
│   │   ├── academics/
│   │   └── inquiries/
│   ├── portfolio/
│   ├── media/
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
└── docs/
```

## Backend Architecture

The backend uses Django and Django REST Framework.

The code is organized into domain apps instead of one large Django app:

- `portfolio_items`: project data and project API
- `tech_stack`: skills and technology API
- `profiles`: planned profile/about data
- `work_history`: planned experience data
- `academics`: planned education data
- `inquiries`: planned contact form submissions

Implemented backend flow:

```text
Model
→ Serializer
→ API View
→ App URL
→ Project URL
→ Frontend service
```

## Frontend Architecture

The frontend uses React, Vite, Tailwind CSS, and Axios.

Main responsibilities:

- `App.jsx`: orchestration, API state, loading/error state
- `sections/`: page-level sections such as hero, projects, skills
- `components/common/`: reusable UI pieces like cards and navigation
- `services/`: API communication layer

Current frontend data flow:

```text
portfolioApi.js
→ App.jsx state
→ ProjectsSection / SkillsSection
→ ProjectCard / skill UI
```

## API Design Principles

Current backend API decisions:

- list APIs use DRF generic views
- project list API is paginated
- list APIs support filtering/search/ordering where useful
- serializers enforce API-level validation
- model validators enforce domain-level data rules
- OpenAPI schema generation is handled by drf-spectacular
- Swagger docs are available at `/api/docs/`

## API Documentation Architecture

API documentation is generated from DRF views and serializers using `drf-spectacular`.

The setup has three parts:

- `drf_spectacular` is installed as a Django app.
- DRF uses `drf_spectacular.openapi.AutoSchema` as the default schema class.
- Project URLs expose `/api/schema/` and `/api/docs/`.

This matters because the API documentation is generated from the backend contract instead of being manually maintained in a separate document.

```text
DRF views and serializers
→ drf-spectacular schema generation
→ /api/schema/
→ /api/docs/
```

## Validation Layers

Validation belongs at the correct layer:

- Model validation protects domain/data rules.
- Serializer validation protects API input/output contracts.
- Tests protect behavior from accidental regression.

Example:

- `TechStack.proficiency` has a model-level max validator.
- `TechStackSerializer` also rejects values greater than `100`.
- Tests verify serializer behavior.

## Current Tradeoffs

- SQLite is used for local development.
- `SECRET_KEY`, `DEBUG`, and API base URLs are still development-oriented.
- Authentication is not implemented yet.
- `ProjectCard` renders trusted rich text HTML from CKEditor content.
- Some apps are scaffolded but not implemented yet.

These are acceptable for the current learning stage, but they are known production hardening items.
