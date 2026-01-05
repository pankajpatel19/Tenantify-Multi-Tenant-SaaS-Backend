# 🚀 Tenantify – Multi-Tenant SaaS Backend (MERN)

A **production-ready multi-tenant SaaS backend** built with **Node.js, Express, MongoDB, and Redis**, following real-world backend architecture and best practices.

This project focuses on **scalability, security, auditability, and clean code design**, similar to systems used in real SaaS products.

---

## 🚀 Features

- 🏢 **Multi-Tenant Architecture**

  - Strict tenant isolation using `tenantId`
  - Cross-tenant access fully prevented

- 🔐 **Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (Admin / User)

- 🧾 **Activity & Audit Logs**

  - Tracks CREATE / UPDATE / DELETE / RESTORE actions
  - Tenant-safe & user-aware logging
  - Logging decoupled from business logic

- 🗑️ **Soft Delete & Restore System**

  - Records are never permanently deleted
  - Admin-only restore functionality

- 🔍 **Automatic Query Filtering**

  - Soft-deleted records hidden by default
  - No need to manually add `isDeleted:false`
  - Admin bypass using `withDeleted:true`

- 🚦 **Rate Limiting & Security**

  - Redis-based rate limiting
  - Protects APIs from abuse (e.g. login brute force)

- 🧼 **Clean Architecture**

  - Routes → Controllers → Services → Utils
  - Centralized error handling
  - Scalable, maintainable codebase

---

## 🛠️ Tech Stack

| Layer                 | Technology                  |
| --------------------- | --------------------------- |
| Backend               | Node.js, Express.js         |
| Database              | MongoDB, Mongoose           |
| Authentication        | JWT                         |
| Cache / Rate Limiting | Redis                       |
| Architecture          | MVC + Services + Middleware |

---

## 📁 Folder Structure

```
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
│   └── redis.js
├── app.js
└── server.js
```

---

## 🔄 Request Flow

```
Client Request
 → Auth Middleware
 → Tenant Middleware
 → Role Middleware
 → Controller
 → Service
 → Activity Log
 → Response
```

---

## 🗑️ Soft Delete Strategy

- Records are **never hard-deleted**
- Data is marked using:

  - `isDeleted`
  - `deletedAt`
  - `deletedBy`

- Soft-deleted records are **automatically hidden**
- Admins can restore deleted records
- Prevents accidental data loss

---

## 📜 Activity Logs

- Logs all critical actions:

  - CREATE
  - UPDATE
  - DELETE
  - RESTORE

- Logs are:

  - Tenant-aware
  - User-specific
  - Stored asynchronously

- Logging does **not affect API performance**

---

```
📦 Project Root
│
├── src
│ ├── config
│ │ ├── db.js # Database connection
│ │ └── redis.js # Redis config
│ │
│ ├── controller
│ │ ├── auth.controller.js
│ │ ├── project.controller.js
│ │ └── activity.controller.js
│ │
│ ├── logs
│ │ ├── logger.js
│ │ └── streams.js
│ │
│ ├── middleware
│ │ ├── auth.middleware.js
│ │ ├── tenant.middleware.js
│ │ ├── rbac.middleware.js
│ │ ├── error.middleware.js
│ │ └── activityLog.middleware.js
│ │
│ ├── models
│ │ ├── user.model.js
│ │ ├── tenant.model.js
│ │ ├── project.model.js
│ │ ├── task.model.js
│ │ ├── activity.model.js
│ │ └── invite.model.js
│ │
│ ├── queue
│ │ ├── email.queue.js
│ │ └── worker.queue.js
│ │
│ ├── rate-limits
│ │ ├── loginRateLimiter.js
│ │ └── tenantRateLimiter.js
│ │
│ ├── routes
│ │ ├── auth.routes.js
│ │ ├── project.routes.js
│ │ └── activity.routes.js
│ │
│ ├── services
│ │ ├── auth.service.js
│ │ ├── project.service.js
│ │ └── activity.service.js
│ │
│ ├── utils
│ │ ├── AppError.js
│ │ ├── catchAsync.js
│ │ ├── jwt.js
│ │ ├── logActivity.js
│ │ └── mailer.js
│ │
│ ├── app.js # Express app config
│ └── index.js # Server entry point
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── combined.log
├── exception.log
└── rejection.log
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tenantify
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/tenantify.git
cd tenantify
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start Redis server

```bash
redis-server
```

### 4️⃣ Run the application

```bash
npm run dev
```

---

## 🚧 Future Improvements

- ☠️ Permanent Delete (Super Admin)
- 🔔 Notification System (Email + In-App)
- 🧵 Background Jobs (BullMQ)
- 📊 Admin Dashboard APIs
- 📄 API Documentation (Swagger)

---

## 👨‍💻 Author

**Pankaj Patel**
MERN Stack Developer

---

⭐ If you find this project useful, please star the repository.
