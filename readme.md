# Authentication System with JWT, GitHub OAuth and Mock Data Generator

A backend authentication system built with Node.js, Express and MongoDB featuring local authentication, GitHub OAuth, JWT authorization, secure cookies, role-based access control and a complete mock data generation module.

---

## Overview

This project implements a complete authentication and authorization system using JWT, Passport.js and GitHub OAuth.

It also includes a professional layered architecture (Controller → Service → Repository), environment configuration validation, centralized constants and a mocking module capable of generating realistic users, products and carts for testing.

---

## Features

### Authentication

- User Registration
- Local Authentication
- GitHub OAuth Authentication
- JWT Authentication
- Secure HTTP-Only Cookies
- Protected Routes
- User Profile Endpoint
- Session Validation Endpoint
- Role-Based Access Control (RBAC)
- Admin-Only Routes
- Logout Functionality

### Architecture

- Controller → Service → Repository architecture
- Environment configuration validation
- Centralized constants
- MongoDB persistence

### Mocking Module

- Generate mock users
- Generate mock products
- Generate mock carts
- Insert mock data into MongoDB
- Real MongoDB relationships between Products and Carts

---

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Passport Local
- Passport GitHub2
- JSON Web Tokens (JWT)
- bcrypt
- Cookie Parser
- Express Session
- Connect Mongo
- Dotenv
- Faker.js

---

## Authentication Flow

### Local Authentication

```text
Register
↓
Login
↓
JWT Generation
↓
Secure Cookie
↓
Protected Routes
```

### GitHub OAuth

```text
GitHub Authorization
↓
OAuth Callback
↓
User Lookup / Creation
↓
JWT Generation
↓
Secure Cookie
↓
Protected Routes
```

---

## API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/profile
GET  /api/v1/auth/session
GET  /api/v1/auth/admin
```

### OAuth

```http
GET /api/v1/auth/github
GET /api/v1/auth/github/callback
```

### Mock Endpoints

Generate data without saving it to MongoDB.

```http
GET /api/mocks/users?quantity=20
GET /api/mocks/products?quantity=20
GET /api/mocks/carts?quantity=10
```

### Generate Mock Data

Insert generated data into MongoDB.

```http
POST /api/mocks/generate
```

Example body:

```json
{
    "users": 20,
    "products": 50,
    "carts": 15
}
```

This endpoint:

- generates mock users
- generates mock products
- generates mock carts
- creates real MongoDB relationships between carts and products
- stores everything in the database

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Lautarot12/shipnow-api.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`.

Run the server:

```bash
node app.js
```

or

```bash
npx nodemon app.js
```

---

## Environment Variables

```env
PORT=
MONGODB_URI=
SECRET_KEY=
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NODE_ENV=development
```

---

## Project Structure

```text
config/
constants/
controllers/
middlewares/
models/
repositories/
routes/
services/
strategies/
utils/
views/
public/
```

---

## Layered Architecture

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
MongoDB
```

---

## Mock Data Structure

### Users

- first_name
- last_name
- email
- password
- provider
- role

### Products

- title
- description
- code
- price
- stock
- status
- category

### Carts

- products
- quantity
- MongoDB ObjectId references

---

## Author

**Lautaro Tello**

LinkedIn

https://linkedin.com/in/lautaro-tello-5a2832321