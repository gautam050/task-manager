# 📋 Task Manager — Full Stack MERN Application

A full-stack task management application with **role-based access control**, **JWT authentication**, and **activity logging** built with the MERN stack.

---

## ✨ Features

### 👤 User
- Register and login with JWT authentication
- Create, view, update, and delete own tasks
- Set task priority (Low / Medium / High)
- Set task status (Pending / In Progress / Completed)
- Dashboard with personal task statistics

### 🛡️ Admin
- View and manage all users
- Activate or deactivate user accounts
- Delete any user
- View all tasks created by all users
- Delete any task
- View full activity logs (login, register, task actions)
- Analytics dashboard with total users, tasks, completed, pending counts

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| Morgan | HTTP request logging |
| dotenv | Environment variables |
| CORS | Cross-origin requests |

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| React Hot Toast | Notifications |
| Context API | Global auth state |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open in browser
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

---



## 🧪 Test Credentials

After running the project, register these accounts manually:

```
Admin Account:
  Email:    admin@test.com
  Password: 123456
  Role:     Admin

User Account:
  Email:    user@test.com
  Password: 123456
  Role:     User
```

---

## 🔮 Future Improvements

- [ ] Refresh token implementation
- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Pagination for large datasets
- [ ] Unit and integration tests (Jest)
- [ ] Docker containerization
- [ ] Deploy to cloud (Vercel + Railway + MongoDB Atlas)
- [ ] Real-time notifications with Socket.io

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built as part of FTO (Fresher Technical Onboarding) — demonstrating full-stack development with role-based access control.
