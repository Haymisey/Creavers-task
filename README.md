# School Management System (MEAN Stack)

This is a simple school management system with Role-Based Access Control (RBAC).

## Roles
- **Admin**: Can manage teachers, students, subjects, and grades.
- **Teacher**: Can assign marks to students and view assigned students.
- **Student**: Can view their grades and marks.

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Update `.env` with your MongoDB URI and JWT Secret.
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`
4. Access at `http://localhost:4200`

## Initial Admin Setup
You can use the `/api/auth/register` endpoint (e.g., via Postman) to create the first Admin user.
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "Admin"
}
```
