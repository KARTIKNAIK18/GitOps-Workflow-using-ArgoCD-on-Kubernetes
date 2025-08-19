# Task Manager Backend

This is the Node.js + Express backend for the Task Manager application.

## Features
- JWT authentication (login/signup)
- REST API for tasks (CRUD)
- MongoDB integration
- CORS enabled for frontend access

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (already provided) and set your MongoDB URI and JWT secret.
3. Start the server:
   ```bash
   npm run dev
   ```

## Folder Structure
- `models/` – Mongoose models for User and Task
- `routes/` – API routes for authentication and tasks
- `server.js` – Main server file

---
Make sure MongoDB is running locally or update the URI for cloud access.
