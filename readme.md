# Authentication System with JWT and GitHub OAuth

A backend authentication system built with Node.js, Express and MongoDB featuring local authentication, GitHub OAuth, JWT authorization, secure cookies and role-based access control.

## Overview

This project implements a complete authentication and authorization system using JWT, Passport.js and GitHub OAuth.

Users can register, log in with local credentials or GitHub, access protected routes, validate active sessions and interact with role-based resources.

## Features

* User Registration
* Local Authentication
* GitHub OAuth Authentication
* JWT Authentication
* Secure HTTP-Only Cookies
* Protected Routes
* User Profile Endpoint
* Session Validation Endpoint
* Role-Based Access Control (RBAC)
* Admin-Only Routes
* Logout Functionality
* MongoDB Persistence

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* Passport Local
* Passport GitHub2
* JSON Web Tokens (JWT)
* bcrypt
* Cookie Parser
* Express Session
* Connect Mongo
* Dotenv

## Authentication Flow

### Local Authentication

```text
Register
→ Login
→ JWT Generation
→ Secure Cookie
→ Protected Routes
```

### GitHub OAuth

```text
GitHub Authorization
→ OAuth Callback
→ User Lookup / Creation
→ JWT Generation
→ Secure Cookie
→ Protected Routes
```

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
git clone https://github.com/Lautarot12/jwt-oauth-authentication.git
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

Or with nodemon:

```bash
npx nodemon app.js
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

## Project Structure

```text
config/
controllers/
middlewares/
models/
routes/
strategies/
views/
public/
```

## Author

Lautaro Tello

LinkedIn:
https://linkedin.com/in/lautaro-tello-5a2832321
