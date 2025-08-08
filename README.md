# 🛠️ ServiSphere Backend

The backend for **ServiSphere** — a full-stack service marketplace where users can book services and providers can manage them. This server handles user authentication, service listing, booking management, and role-based access using Firebase JWT and MongoDB
---

## 🌐 Live API

**Base URL:** `https://a11server-iota.vercel.app/`  

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with **Mongoose**)
- **Firebase Admin SDK** (for JWT verification)
- **Jwt authentication**
- **CORS**, **Dotenv**, **Multer** (if using file uploads)

---

## 📁 Folder Structure

backend/
│
├── controllers/ # API logic
├── middlewares/ # Authentication & authorization
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── firebase/ # Firebase Admin config
├── utils/ # Helper functions (optional)
├── .env # Environment variables
├── server.js # App entry point
└── package.json

# Service-App-Server
