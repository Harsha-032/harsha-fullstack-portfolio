# Project Roadmap

This roadmap documents the completed milestones and outlines development directions for the application, ensuring the engineering focus remains on robust systems architecture.

---

## ✅ Completed Milestones

### Backend:
- **Modular Django Layout**: Created isolated, single-responsibility apps under `apps/`.
- **API Spec Generation**: Integrated `drf-spectacular` for OpenAPI 3.0 specification compilation and dynamic Swagger UI rendering at `/api/docs/`.
- **Tech Stack app**: Configured skill proficiency limits and categorizations.
- **Portfolio Items app**: Enabled title searching, featured filters, and rich-text desc formatting.
- **Profiles app**: Implemented dynamic retrieval of the latest bio profile, avatar photos, and resume media downloads.
- **Experiences app**: Built career roles history timeline list view with search, filter, and ordering configurations.
- **Social Links app**: Implemented display ordering and platform choice options.
- **Inquiries app**: Built POST endpoints that validate and store incoming contact messages in the database.
- **Automated API Tests**: Set up test suites in `portfolio_items` and `tech_stack` with custom SQLite configuration.

### Frontend:
- **Environment API Client**: Configured Axios client routing via `import.meta.env.VITE_API_BASE_URL`.
- **Cinematic WebGL Flight Background**: Integrated dynamic Three.js canvas scrolling landscape.
- **Custom Cursor & Smooth Scrolling**: Custom physics cursor tracking and Lenis page scrolling.
- **Hero & About Me Sections**: Connected and rendered bio payloads and media links.
- **Skills Section**: Implemented categorization groups, skill-level progress tracking, and dynamic SVG icon downloads.
- **Timeline Experience Section**: Dynamic rendering of career timeline points.
- **Projects Section**: Dynamic display of project cards with live links and GitHub indicators.
- **Developer Terminal Simulator**: Added an interactive SSH console overlay to query api attributes (`about`, `skills`, `projects`, `contact`) directly in-browser.
- **WebGL Verification Testing**: Configured automated headless canvas pixel test script via Playwright.

---

## 🎯 Immediate Priorities

### 1. Backend Test Gaps
- Write model and serializer validation unit tests for `profiles`, `experiences`, `social_links`, and `inquiries` apps.
- Implement integration tests validating combined API endpoints.

### 2. Frontend Inquiry Route Migration
- Refactor the frontend `submitInquiry` API in `frontend/src/services/portfolioApi.js` to target the local Django REST API `/api/inquiries/` instead of `https://formspree.io/f/mykaejed`.
- Enable a local testing path to verify message writes in PostgreSQL.

### 3. Academics App Implementation
- Build database model in `backend/apps/academics/models.py` (Institution, degree, field of study, start/end date, order, description).
- Implement serializer and read list view `/api/academics/`.
- Mount route in project-wide `urls.py`.
- Add Academics admin register settings.
- Write unit tests for Academics serializers and views.
- **Frontend Sync**: Update the frontend timeline component to render Academics side-by-side with Experience.

---

## 🔒 Production Hardening

- **Docker Integration**: Set up Docker and Compose configurations to run backend servers, PostgreSQL databases, and tests in containerized nodes.
- **CORS Settings Hardening**: Configure environment-based CORS restrictions rather than wide localhost policies.
- **CKEditor 4 Upgrade**: Replace `django-ckeditor` with CKEditor 5 or simple markdown input to resolve end-of-life warnings.
- **Environment Secrets**: Ensure production configurations (secret keys, API ports, DB passwords) are completely loaded from environment variables rather than fallbacks.
- **Admin Authentication**: Configure secure token-based (JWT) or session authentication for post, put, and delete endpoints to protect administrative operations.
