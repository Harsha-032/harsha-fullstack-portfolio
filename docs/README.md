# Harsha Full-Stack Portfolio Docs

This folder documents the project as a production-style learning application, detailing all architectural patterns, database configurations, and engineering tradeoffs.

The project is intentionally structured to model real-world software engineering practices:

- **Modular Domain Architecture**: Isolated Django applications per domain logic.
- **Strict API Design**: REST-compliant endpoints with type checking, search, sorting, and pagination.
- **Automated Contracts**: OpenAPI 3.0 schema generation and interactive Swagger documentation.
- **Frontend Integration**: Async state management (loading, error, empty states) with a dynamic UI.
- **Comprehensive Testing**: Serializer verification, view response validation, and WebGL automated verification.

---

## 📖 Docs Index

- 🏗️ **[Architecture Overview](./architecture.md)**: Details backend modularity, data flows, validation layers, and third-party integrations (Cloudinary, Whitenoise).
- 🔌 **[API Reference](./api-reference.md)**: Full endpoints documentation, query parameters, validation rules, and automated OpenAPI/Swagger setup details.
- 💻 **[Local Development Setup](./local-development.md)**: Quickstart guide, environment configuration (`.env`), database migration patterns, and local commands.
- 🧪 **[Testing & Quality Guide](./testing.md)**: Explains the testing philosophy, how to run backend unit tests, and Playwright-based 3D UI validation checks.
- 🗺️ **[Development Roadmap](./roadmap.md)**: Completed items, immediate task priorities, production hardening items, and technical interview discussion points.

---

## 📈 Current Project Status

### Implemented Backend APIs:
- **Profiles API**: Exposes headline, bio, location, email, avatar, and resume documents.
- **Experiences API**: Exposes work history, career roles, dates, and locations (with filter/search/sort).
- **Tech Stack API**: Exposes technology details grouped by category with skill proficiency and custom icons.
- **Portfolio Items API**: Exposes featured and regular project metadata, description tags, and URLs (paginated).
- **Social Links API**: Exposes active social handles sorted by custom display order.
- **Inquiries API**: Exposes contact form submission endpoints.
- **OpenAPI / Swagger Generation**: Dynamic schema generation at `/api/schema/` and UI at `/api/docs/`.

### Implemented Frontend Sections:
- **Navbar**: Responsive navigation with theme styling.
- **Hero Section**: Landing animations and 3D flight paths.
- **About Me Section**: Full biography display with image loading and resume download triggers.
- **Experience Section**: Interactive timeline displaying career history dynamically retrieved from the database.
- **Skills Section**: Hover-enhanced grid showing technology stacks sorted by proficiency and custom SVGs.
- **Projects Section**: Featured projects carousel/grid with direct GitHub and live links.
- **Contact Section**: High-end interactive message form with magnetic button feedback and status loaders.
- **Terminal Simulator Modal**: Interactive developer console allowing guests to execute SSH-like commands (`about`, `skills`, `projects`, `contact`) to query API data.

---

## 🎯 Current Engineering Focus
- **Test Coverage Expansion**: Adding serializer and API tests for the newly added Django apps (`profiles`, `experiences`, `social_links`, `inquiries`).
- **Formspree Refactoring**: Shifting the contact form submission API from Formspree to the local inquiries endpoint.
- **Dockerization**: Setting up containers for local PostgreSQL replication and production-like deployment.
