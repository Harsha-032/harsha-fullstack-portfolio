# Local Development Guide

Follow this guide to get both the Django REST Framework backend and the React/Vite frontend running locally.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Backend**:
  - Python (v3.10 or higher)
  - `pip` (Python package manager)
  - `venv` (Python virtual environment manager)
  - PostgreSQL client libraries (required to compile the `psycopg` database adapter)
- **Frontend**:
  - Node.js (v18 or higher)
  - `npm` (Node package manager)

---

## 💾 Database Configuration

The application is configured to run with different databases depending on the command:

1. **Development & Server Execution**: The app runs on **PostgreSQL** (specifically configured for Neon serverless PostgreSQL by default). The database settings are loaded directly from the `backend/.env` file.
2. **Automated Testing**: When you run `python manage.py test`, the application automatically overrides the database configuration to use **SQLite** (`backend/db.sqlite3` file). This isolates test data mutations and speeds up execution.

---

## 🔑 Environment Setup

### 1. Backend Environment Configurations
Create a file named `.env` in the `backend/` directory:
```bash
touch backend/.env
```

Add the following environment variables (adjust values to match your resources):
```env
DJANGO_SECRET_KEY=your-custom-insecure-django-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Database configuration (Neon Postgres example)
PGHOST=ep-soft-shape-ao8tq6xh-pooler.c-2.ap-southeast-1.aws.neon.tech
PGDATABASE=neondb
PGUSER=neondb_owner
PGPASSWORD=your_secure_password
PGSSLMODE=require
PGCHANNELBINDING=require

# Media asset hosting (Cloudinary settings)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

### 2. Frontend Environment Configurations
Create a file named `.env` in the `frontend/` directory:
```bash
touch frontend/.env
```

Configure the backend API location:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## 🚀 Running the Backend

From the project root:

```bash
# Navigate to the backend directory
cd backend

# Create a Python virtual environment (if not already created)
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows (PowerShell):
# .\venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Run migrations to update the database schema
python manage.py migrate

# Create a superuser to access the Django admin dashboard (/admin/)
python manage.py createsuperuser

# Start the local development server
python manage.py runserver
```

The Django development server will run at `http://127.0.0.1:8000/`.

---

## 📦 Running the Frontend

From the project root:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The React frontend server will boot up at `http://localhost:5173/`.

### Extra Frontend Scripts:
- `npm run lint`: Runs ESLint checks on components and source scripts.
- `npm run build`: Compiles production assets in the `dist/` directory.
- `npm run verify:3d`: Launches Playwright to verify Three.js WebGL canvas integration and screenshot viewport renders. (Requires Google Chrome installed on `/usr/bin/google-chrome` or via path overrides).

---

## ⚠️ Known Warnings in Development

### CKEditor 4 Support Status
You will see a warning in the Django terminal console:
```text
django-ckeditor currently prints a warning about CKEditor 4 support status.
```
*Why this exists*: The `django-ckeditor` library uses CKEditor 4, which is end-of-life. It does not affect local operations or test suites, but for production systems, it is recommended to transition to an alternative editor (such as CKEditor 5 or simple markdown input fields).
