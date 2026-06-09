# Testing & Quality Guide

The project leverages automated testing on both the backend and frontend to ensure API contract integrity, correct input validation, and rendering stability.

---

## 💾 Backend Testing

Backend tests are run using Django's default test runner. Crucially, running tests automatically overrides database configurations to use a clean **SQLite database** instead of the development PostgreSQL database, ensuring tests run fast and isolate side effects.

### Run All Backend Tests
From the `backend/` directory:
```bash
python manage.py test apps
```

### Run App-Specific Tests
To run tests only for a specific domain module:
```bash
# Portfolio Items tests
python manage.py test apps.portfolio_items

# Tech Stack tests
python manage.py test apps.tech_stack
```

---

## 📋 Current Test Coverage

### 1. Portfolio Items (`apps/portfolio_items/tests.py`)
- **`test_description_cannot_be_empty_rich_text`**: Verifies that serializers reject projects where the description contains only empty HTML tags (e.g. `<p><br></p>`).
- **`test_list_returns_paginated_response_shape`**: Asserts that the response payload matches the expected pagination contract (`count`, `next`, `previous`, `results` keys).
- **`test_list_can_filter_featured_projects`**: Verifies the `?featured=true` filter returns only marked projects.
- **`test_list_can_search_projects`**: Validates search filtering across title and description.

### 2. Tech Stack (`apps/tech_stack/tests.py`)
- **`test_proficiency_cannot_be_greater_than_100`**: Validates that skill proficiency values greater than `100` fail serializer validation.

---

## ⚠️ Backend Test Gaps to Close

The recently implemented apps (`profiles`, `experiences`, `social_links`, `inquiries`) do not currently have unit tests. The following coverage should be added:

1. **`profiles`**:
   - Verify only the latest profile is returned by the GET view.
   - Assert validation rules on file fields (resumes, background images).
2. **`experiences`**:
   - Verify filtering by `employment_type` and `current`.
   - Assert search filters role and description.
   - Verify reverse chronological ordering by `start_date`.
3. **`social_links`**:
   - Assert that inactive social links (`is_active=False`) are filtered out.
   - Verify ordering by `display_order`.
4. **`inquiries`**:
   - Test `POST /api/inquiries/` submissions.
   - Verify email validation format rejects invalid address types.
   - Assert that `created_at` and `id` remain read-only.

---

## 🎨 Frontend WebGL 3D UI Testing

Because the UI renders a dynamic 3D flight landscape using Three.js (WebGL), standard visual regression tests are prone to failure. Instead, the project uses a specialized **Playwright script** to verify the WebGL drawing state.

### Run Three.js UI Verification
From the `frontend/` directory:
```bash
npm run verify:3d
```

### Script Execution Logic (`frontend/scripts/verify-3d-ui.mjs`):
1. **Headless Execution**: Playwright boots up a headless Chromium browser instance.
2. **Selector Validation**: The script navigates to the environment URL (defaulting to `http://127.0.0.1:5174/`) and waits for the `<canvas>` element to mount.
3. **Bounding Box Check**: Verifies that the canvas dimensions are greater than `100px` (ensuring it is visible and not collapsed).
4. **Context & Pixel Extraction**:
   - Evaluates the canvas in-browser to retrieve a `webgl` or `webgl2` rendering context.
   - Calls `gl.readPixels()` on coordinate nodes to sample color matrices.
   - Confirms that the alpha channel values and RGB components are non-blank, proving that rendering shaders are executing.
5. **Screenshots Generation**: Generates full-page PNG screenshots for desktop (`desktop-3d-ui.png`) and mobile (`mobile-3d-ui.png`) inside the `frontend/test-artifacts/` folder.
