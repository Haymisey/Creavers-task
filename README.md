# Creavers School Management System

A premium, modern School Management System built with the MEAN stack (MongoDB, Express, Angular, Node.js).

## ✨ Key Features
- **Premium UI/UX**: Glassmorphism design, animated backgrounds, and responsive layouts.
- **Flexible Class Architecture**: Create Classes (e.g., 10-A) with multiple subjects, each assigned to a specific teacher.
- **Cross-Portal Sync**: Real-time updates across Admin, Teacher, and Student dashboards.
- **Detailed Progress Tracking**: Students can view their marks and see exactly which teacher assigned them.

## 👥 Roles & Permissions
- **Admin**:
  - Manage Teachers and Students.
  - Define Curriculum (Subjects).
  - Configure Classes with multi-subject teacher assignments.
- **Teacher**:
  - View students in assigned classes.
  - Assign marks only for their specific subjects.
- **Student**:
  - Track academic progress.
  - View detailed marks reports including teacher names.

## 🛠️ Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`
4. Access at `http://localhost:4200`

## 🚀 Initial Admin Setup
Use the provided `seed_admin.js` script to create the initial administrative user:
```bash
cd backend
node seed_admin.js
```
Default credentials: `admin@creavers.com` / `password123`
