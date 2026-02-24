# Creavers Learning Portal – Documentation

## Architecture Overview

The application follows a **monolith architecture** where the Angular frontend is served directly by the Express backend as a single deployable unit.

```
┌──────────────────────────────────────────────┐
│                   Client                     │
│              (Browser / Angular)             │
└──────────────────┬───────────────────────────┘
                   │ HTTP Requests
                   ▼
┌──────────────────────────────────────────────┐
│              Express.js Server               │
│                                              │
│   ┌─────────────────────────────────────┐    │
│   │  Static File Serving (Angular SPA)  │    │
│   └─────────────────────────────────────┘    │
│                                              │
│   ┌─────────────────────────────────────┐    │
│   │           API Routes                │    │
│   │  /api/auth     → Authentication     │    │
│   │  /api/admin    → CRUD Operations    │    │
│   │  /api/teacher  → Marks & Classes    │    │
│   │  /api/student  → View Marks         │    │
│   └─────────────────────────────────────┘    │
│                                              │
│   ┌─────────────────────────────────────┐    │
│   │    Middleware (JWT Auth + RBAC)      │    │
│   └─────────────────────────────────────┘    │
└──────────────────┬───────────────────────────┘
                   │ Mongoose ODM
                   ▼
┌──────────────────────────────────────────────┐
│              MongoDB Atlas                   │
│   Collections: Users, Subjects, Grades,      │
│                Marks                         │
└──────────────────────────────────────────────┘
```

### Data Model

- **User** – Stores name, email, hashed password, and role (admin/teacher/student).
- **Subject** – Stores subject name and description.
- **Grade** – Represents a class/section. Contains arrays of enrolled students and subject-teacher assignments.
- **Mark** – Links a student, subject, and grade with the assigned marks.

### Authentication Flow

1. User submits credentials → Backend validates and returns a JWT token.
2. Frontend stores the token in `localStorage`.
3. All subsequent API calls include the token in the `Authorization` header.
4. Backend middleware verifies the token and checks the user's role before granting access.

---

## Challenges Faced & Solutions

### 1. Student Dashboard Showing Incomplete Subjects
**Problem:** Students enrolled in multiple classes (e.g., Grade 10-A for Math, Grade 10-B for Social) only saw subjects from one class.

**Solution:** Changed the backend query from `Grade.findOne()` to `Grade.find()` to retrieve all grades a student is enrolled in, then flattened the results into a single curriculum list.

### 2. Express 5 Route Compatibility
**Problem:** Express 5 uses a newer version of `path-to-regexp` that doesn't support wildcard patterns like `*` or `(.*)` for catch-all routes, causing the server to crash on deployment.

**Solution:** Replaced the `app.get('*')` catch-all with `app.use()` middleware for SPA fallback routing.

### 3. Angular CLI Not Found on Render
**Problem:** Render's production build environment skipped dev dependencies, making the `ng` command unavailable.

**Solution:** Used `npx ng` in build scripts and added `--include=dev` to the npm install command to ensure the Angular CLI is available during the build process.

### 4. API URLs Hardcoded to Localhost
**Problem:** The frontend services had `http://localhost:5000` hardcoded as the API base URL, which doesn't work in production.

**Solution:** Switched to relative paths (`/api`) and created a `proxy.conf.json` for local development to forward `/api` requests to the backend.

### 5. MongoDB Atlas IP Whitelisting
**Problem:** Render's server IP was not whitelisted in MongoDB Atlas, causing connection failures.

**Solution:** Configured Atlas Network Access to allow connections from any IP (`0.0.0.0/0`), which is the standard approach for cloud-deployed applications since the database is still protected by credentials.
