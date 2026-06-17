# Authentication System with JWT and GitHub OAuth

A backend authentication system built with Node.js, Express and MongoDB featuring local authentication, GitHub OAuth, JWT authorization, secure cookies and role-based access control.

## Features

* User Registration
* Local Authentication
* GitHub OAuth Authentication
* JWT Authentication
* Secure HTTP-Only Cookies
* Protected Routes
* User Profile Endpoint
* Session Validation Endpoint
* Admin-Only Routes
* Logout Functionality
* MongoDB Persistence

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* Passport Local
* Passport GitHub2
* JWT
* bcrypt
* Cookie Parser
* Express Session
* Connect Mongo

## Authentication Flow

### Local Authentication

Register
→ Login
→ JWT Generation
→ Secure Cookie
→ Protected Routes

### GitHub OAuth

GitHub Authorization
→ OAuth Callback
→ User Lookup / Creation
→ JWT Generation
→ Secure Cookie
→ Protected Routes

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

## Installation

Clone the repository:

```bash
git clone <repository-url>
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

## Environment Variables

```env
PORT=
URI_MONGODB=
SECRET_KEY=
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NODE_ENV=development
```

## Author

Lautaro Tello

LinkedIn:
https://linkedin.com/in/lautaro-tello-5a2832321
