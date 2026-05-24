# Roadmap

This roadmap keeps the project focused on engineering learning instead of surface-level portfolio polish.

## Completed

Backend:

- modular Django app structure
- portfolio items model/API
- tech stack model/API
- Swagger/OpenAPI docs
- filtering/search/ordering setup
- portfolio pagination
- serializer validation
- model-level proficiency validation
- backend tests for current validation and API behavior

Frontend:

- React/Vite setup
- Tailwind setup
- Axios service layer
- Navbar, hero, projects, and skills sections
- dynamic project rendering
- dynamic skills rendering
- project pagination controls
- loading/error state for project and skill API calls

Git:

- feature branch workflow
- commits and pushes
- pull request workflow
- cleanup of tracked SQLite database

## Immediate Backend Priorities

1. Finish API behavior tests
   - portfolio ordering
   - tech stack filter/search/ordering

2. Add Profile/About API
   - model
   - serializer
   - list/detail endpoint
   - admin registration
   - tests

3. Add Work History API
   - company
   - role
   - start/end dates
   - current flag
   - description

4. Add Academics API
   - institution
   - degree
   - field
   - start/end years

5. Add Inquiries API
   - `POST /api/inquiries/`
   - serializer validation
   - status code handling
   - tests

## Production Hardening

- move secrets and environment-specific config to `.env`
- configure PostgreSQL
- add CORS settings by environment
- replace or upgrade CKEditor 4 dependency
- introduce authentication for admin-style write APIs if needed
- add CI for tests and linting
- prepare Docker setup
- deploy with Gunicorn, Nginx, and a real database

## Frontend Priorities After Backend

- add empty states
- improve API service configuration
- extract reusable hooks for API state
- add responsive polish
- add About, Experience, Education, and Contact sections
- connect new backend APIs to UI

## Interview Discussion Topics

- why Django apps are modularized
- why serializers exist
- model validation versus serializer validation
- why list APIs need pagination
- API response contracts
- frontend async state: loading, error, empty, success
- Git branch and PR workflow
- SQLite versus PostgreSQL
- deployment architecture
