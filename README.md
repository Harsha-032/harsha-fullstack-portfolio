# Harsha Full-Stack Portfolio

Welcome to my full-stack software engineering portfolio project. This repository is built as a production-grade showcase, implementing modern design systems, WebGL-powered 3D backgrounds, robust API design principles, and comprehensive testing patterns.

The project is split into a Django REST Framework (DRF) backend and a React/Vite frontend.

---

## 🛠️ Technology Stack

- **Frontend**: React (v19), Vite, Three.js (React Three Fiber & Drei) for cinematic WebGL physics rendering, Tailwind CSS, Framer Motion (Motion), Axios, and Lenis for smooth scrolling.
- **Backend**: Python (v3), Django (v6), Django REST Framework, drf-spectacular (OpenAPI 3.0 / Swagger schema generator), WhiteNoise (for static file handling), and Cloudinary (for production media uploads).
- **Database**: Neon Serverless PostgreSQL (for local development and production storage via `.env`), SQLite (reserved for automated testing).

---

## 📁 Repository Structure

```text
harsha-fullstack-portfolio/
├── backend/                  # Django REST Framework application
│   ├── apps/                 # Modular domain-specific Django apps
│   │   ├── portfolio_items/  # Projects metadata, tagging, and storage
│   │   ├── tech_stack/       # Skill inventory, categorization, and icons
│   │   ├── profiles/         # Professional summary and resume links
│   │   ├── experiences/      # Career history, roles, and descriptions
│   │   ├── social_links/     # External platforms (GitHub, LinkedIn)
│   │   └── inquiries/        # Contact form submission receiver
│   └── portfolio/            # Core project settings and routing
├── frontend/                 # React and Vite SPA client
│   ├── src/
│   │   ├── components/       # Custom reusable inputs, navs, and canvas
│   │   ├── sections/         # Screen-sized landing page components
│   │   └── services/         # Axios-based API client layer
│   └── package.json
└── docs/                     # Engineering documentation folder
```

---

## 📖 Project Documentation

For a deep dive into the software engineering concepts, design decisions, and system setups, browse the dedicated documentation in the [docs](./docs) directory:

- 🏗️ **[Architecture Overview](./docs/architecture.md)**: Details backend modularity, data flows, validation layers, and third-party integrations (Cloudinary, Whitenoise).
- 🔌 **[API Reference](./docs/api-reference.md)**: Full endpoints documentation, query parameters, validation rules, and automated OpenAPI/Swagger setup details.
- 💻 **[Local Development Setup](./docs/local-development.md)**: Quickstart guide, environment configuration (`.env`), database migration patterns, and local commands.
- 🧪 **[Testing & Quality Guide](./docs/testing.md)**: Explains the testing philosophy, how to run backend unit tests, and Playwright-based 3D UI validation checks.
- 🗺️ **[Development Roadmap](./docs/roadmap.md)**: Completed items, immediate task priorities, production hardening items, and technical interview discussion points.

---

## 🚀 Quick Start (Local Setup)

Detailed steps can be found in the [Local Development Guide](./docs/local-development.md).

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
*Note: Make sure to configure the `.env` file in `backend/` with details from the setup guide.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173/`.
