# Testing Guide

## Test Philosophy

Tests should protect behavior that the app depends on.

Current priorities:

- serializer validation rules
- API response contracts
- filtering/search behavior
- pagination response shape

## Run All Backend Tests

From the project root:

```bash
backend/venv/bin/python backend/manage.py test apps
```

Or from `backend/` with the virtual environment activated:

```bash
python manage.py test apps
```

## Run App-Specific Backend Tests

Portfolio items:

```bash
python manage.py test apps.portfolio_items
```

Tech stack:

```bash
python manage.py test apps.tech_stack
```

## Current Backend Coverage

Portfolio item tests cover:

- rich text descriptions cannot be visually empty
- list endpoint returns paginated response shape
- featured filtering works
- search works

Tech stack tests cover:

- proficiency cannot be greater than `100`

## Frontend Checks

From `frontend/`:

```bash
npm run lint
```

## Test Gaps To Close

Important remaining backend test coverage:

- portfolio ordering
- tech stack list response
- tech stack category filtering
- tech stack search
- tech stack ordering
- pagination page size behavior
- future create/update validation once write APIs exist

Important frontend test coverage later:

- loading state
- error state
- empty state
- pagination controls
- API service behavior
