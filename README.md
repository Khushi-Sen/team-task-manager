# Team Task Manager 🚀

A full-stack Team Task Manager web application built for collaborative project management, task assignment, and progress tracking with role-based access control.

---

## 🌟 Features

### 🔐 Authentication
- User Signup/Login
- JWT-based authentication
- Role-based access:
  - **Admin**
  - **Member**

---

### 👨‍💼 Admin Capabilities
- Create and delete projects
- Add/remove members from projects
- Assign tasks to team members
- Track all tasks across projects
- Manage project workflows

---

### 👩‍💻 Member Capabilities
- View assigned projects
- View assigned tasks
- Update task progress:
  - Pending
  - In Progress
  - Completed

---

### 📊 Dashboard
- Project overview
- Task status tracking
- Overdue task visibility
- Team collaboration management

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

### Deployment
- Railway (Backend)
- Vercel / Netlify (Frontend)

---

## 📁 Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminmiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Installation & Setup Guide
1️⃣ Clone the Repository
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager
2️⃣ Backend Setup
Navigate:
cd backend
Install Dependencies:
npm install
Create .env File:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run Backend:
npm run dev

Backend will run on:

http://localhost:5000
3️⃣ Frontend Setup
Navigate:
cd frontend
Install Dependencies:
npm install
Run Frontend:
npm run dev

Frontend will run on:

http://localhost:5173
🌍 Deployment Guide
🚂 Railway Deployment (Backend)
Push code to GitHub
Connect GitHub repo to Railway
Select backend as root directory
Add environment variables:
MONGO_URI
JWT_SECRET
PORT
Deploy
🌐 Vercel / Netlify Deployment (Frontend)
Connect frontend folder
Add environment variable:
VITE_API_URL=your_backend_url
Deploy
🔑 Role System
Admin:
Full project management
Full task control
Team management
Member:
Assigned tasks only
Assigned projects only
Task status updates
📌 API Endpoints
Authentication Routes
Signup:
POST /api/auth/signup
Login:
POST /api/auth/login
Project Routes
Create Project:
POST /api/projects
Get Projects:
GET /api/projects
Delete Project:
DELETE /api/projects/:id
Add Member:
PUT /api/projects/:id/add-member
Remove Member:
PUT /api/projects/:id/remove-member
Task Routes
Create Task:
POST /api/tasks
Get Tasks:
GET /api/tasks
Update Task:
PUT /api/tasks/:id
Delete Task:
DELETE /api/tasks/:id
🎨 UI/UX Highlights
Beautiful modern dashboard
Fully responsive design
Elegant login/signup pages
Project cards
Task cards
Sidebar navigation
Admin/member workflow segregation
Professional aesthetic suitable for recruiters
🧪 Validation & Security
JWT Authentication
Password Hashing
Protected Routes
Admin Middleware
Role Validation
Input Validation
Database Relationships
🚀 Future Enhancements
Real-time notifications
Team chat
File uploads
Comments system
Calendar integration
Productivity analytics
Email reminders
👨‍💻 Author

Khushi

Full-Stack Developer | UI/UX Enthusiast | Project Builder

This project was created as part of a technical hiring assignment to demonstrate:

Frontend Development
Backend Architecture
Database Design
Authentication
Deployment Skills
Professional UI Design
📄 License

This project is intended for educational, technical demonstration, and hiring assessment purposes.

⭐ Final Note

This project represents a complete production-style team collaboration platform combining:

✔ Full-Stack Development
✔ Authentication
✔ Role-Based Access
✔ Project Management
✔ Task Assignment
✔ Dashboard Analytics
✔ Deployment