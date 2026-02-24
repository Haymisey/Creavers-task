# Creavers Learning Portal

A full-stack classroom management application built with **Angular 21** and **Express.js 5**, featuring role-based dashboards for Admins, Teachers, and Students.

**Live URL:** [https://creavers-learning-portal.onrender.com](https://creavers-learning-portal.onrender.com)

---

## Features

- **Admin Dashboard** – Manage Teachers, Students, Subjects, and Grades (Classes) with full CRUD operations. Assign subjects and teachers to classes, and enroll students.
- **Teacher Dashboard** – View assigned classes and students. Assign marks per subject to each student.
- **Student Dashboard** – View all enrolled subjects across multiple classes, along with assigned marks.
- **Authentication** – JWT-based login with role-based route protection (Admin, Teacher, Student).

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Angular 21, Angular Material        |
| Backend   | Node.js, Express.js 5              |
| Database  | MongoDB (Mongoose ODM)             |
| Auth      | JWT (jsonwebtoken), bcryptjs       |
| Hosting   | Render (monolith deployment)       |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm (comes with Node.js)

---

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Haymisey/Creavers-task.git
cd Creavers-task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=mongodb://localhost:27017/creavers
JWT_SECRET=your_jwt_secret_key_here
```

> Replace `MONGODB_URI` with your MongoDB Atlas connection string if using a cloud database.

Start the backend server:

```bash
npm start
```

The backend will run on **http://localhost:5000**.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will run on **http://localhost:4200** and automatically proxy API requests to the backend.

### 4. Seed an Admin User (Optional)

To create an initial admin account:

```bash
cd backend
node seed_admin.js
```

---

## Project Structure

```
Creavers-task/
├── package.json            # Root build scripts (for deployment)
├── backend/
│   ├── server.js           # Express server entry point
│   ├── config/db.js        # MongoDB connection
│   ├── middleware/auth.js   # JWT auth & role authorization
│   ├── models/             # Mongoose schemas (User, Subject, Grade, Mark)
│   ├── routes/             # API routes (auth, admin, teacher, student)
│   └── .env                # Environment variables (not committed)
└── frontend/
    ├── src/app/
    │   ├── modules/
    │   │   ├── admin/      # Admin dashboard + dialogs
    │   │   ├── teacher/    # Teacher dashboard + assign marks dialog
    │   │   └── student/    # Student dashboard
    │   └── services/       # AuthService, DataService
    └── proxy.conf.json     # Dev proxy for API calls
```

---

## Default Test Accounts

| Role    | Email              | Password   |
|---------|--------------------|------------|
| Admin   | admin@creavers.com | password123|

> Teachers and Students can be created from the Admin dashboard.
