# ShipNow API - Authentication, Mock Data, Error Handling and Logging

A backend API built with Node.js, Express and MongoDB featuring local authentication, GitHub OAuth, JWT authorization, role-based access control, mock data generation, centralized error handling and professional logging with Winston.

---

## Overview

ShipNow API is a backend application built using a layered architecture:

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

The project includes authentication and authorization, MongoDB persistence, realistic mock data generation, centralized error handling and a professional logging system.

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
- Centralized error handling
- Custom application errors
- Centralized error dictionary
- Global error middleware

### Mocking Module

- Generate mock users
- Generate mock products
- Generate mock carts
- Insert mock data into MongoDB
- Real MongoDB relationships between Products and Carts
- Validation of mock quantities
- Controlled error handling for invalid mock data

### Logging

- Centralized Winston logger
- Multiple logging levels
- Console logging
- Persistent log files
- Error log persistence
- Automatic log rotation
- Environment-based logging behavior
- Logger test endpoint

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
- Winston
- Winston Daily Rotate File

---

## API Documentation

ShipNow API includes interactive API documentation using Swagger and OpenAPI.

Swagger UI is available at:

http://localhost:8080/api/docs

From Swagger UI you can explore and test the documented API endpoints directly from the browser.

### Documented Modules

The API documentation is organized into the following modules:

- Auth / Users
- Products
- Carts
- Mocks
- Logger

### Swagger Features

The documentation includes:

- HTTP methods and routes
- Path parameters
- Query parameters
- Request bodies
- Successful responses
- Error responses
- Reusable schemas
- Authentication-related responses
- Mock data generation examples
- Logger testing endpoint

### Reusable Schemas

The following schemas are defined and reused throughout the documentation:

- User
- Product
- Cart
- CartItem
- ErrorResponse
- SuccessResponse

### Logger Testing

The logger test endpoint is available at:

GET /api/v1/logger/test

This endpoint is intended exclusively for validating the application's logging system and is not a business functionality.

### Mock Data

Mock endpoints can be used to generate test data.

Examples:

GET /api/mocks/users?quantity=20

GET /api/mocks/products?quantity=20

GET /api/mocks/carts?quantity=10

Mock data can also be generated and inserted into MongoDB using:

POST /api/mocks/generate

Example request body:

{
    "users": 20,
    "products": 50,
    "carts": 10
}

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

These endpoints generate mock data without saving it to MongoDB.

```http
GET /api/mocks/users?quantity=20
GET /api/mocks/products?quantity=20
GET /api/mocks/carts?quantity=10
```

The `quantity` query parameter must be a positive integer.

Example:

```http
GET /api/mocks/users?quantity=20
```

Invalid quantities such as negative numbers, zero or non-integer values are rejected by the centralized error handling system.

---

## Generate Mock Data

The following endpoint generates and stores mock data in MongoDB.

```http
POST /api/mocks/generate
```

Example request body:

```json
{
    "users": 20,
    "products": 50,
    "carts": 15
}
```

This endpoint:

- Generates mock users
- Generates mock products
- Generates mock carts
- Creates real MongoDB relationships between carts and products
- Stores the generated data in MongoDB

---

## Error Handling

ShipNow API uses a centralized error handling system.

The application includes:

- Custom errors
- Centralized error dictionary
- Global error middleware
- Consistent error responses

Errors are detected in the appropriate layer, especially in services, while the final HTTP response is handled by the global error middleware.

### Error Response Structure

All handled errors follow a consistent structure:

```json
{
    "status": "error",
    "code": "PRODUCT_NOT_FOUND",
    "message": "Producto no encontrado"
}
```

### Examples

#### Product Not Found

```json
{
    "status": "error",
    "code": "PRODUCT_NOT_FOUND",
    "message": "Producto no encontrado"
}
```

#### Invalid Mock Quantity

```json
{
    "status": "error",
    "code": "INVALID_MOCK_QUANTITY",
    "message": "La cantidad de mocks es invalida"
}
```

#### Database Error

```json
{
    "status": "error",
    "code": "DATABASE_ERROR",
    "message": "Error interno de base de datos"
}
```

---

## Logging

ShipNow API uses **Winston** as a centralized logging system.

The logger is configured in a dedicated module and can be imported and used throughout the application without duplicating its configuration.

### Logging Levels

The application supports the following logging levels:

- `debug` - Detailed information useful during development.
- `http` - HTTP request and response information.
- `info` - General application events.
- `warning` - Expected or potentially problematic situations.
- `error` - Unexpected errors and application failures.
- `fatal` - Critical errors that can prevent the application from working correctly.

### Logging Examples

The logger is used for important application events such as:

- Server startup
- MongoDB connection
- MongoDB connection failures
- Mock data generation
- Invalid mock quantities
- Expected application errors
- Unexpected server errors
- Important application operations

The global error middleware also integrates with the logger so errors can be recorded while maintaining the centralized error response structure.

---

## Log Files

Application logs are stored inside the `logs/` directory.

Example structure:

```text
logs/
├── combined.log
└── error.log
```

The `error.log` file is reserved for important errors and contains only:

```text
error
fatal
```

Regular informational logs such as `info` and `debug` are not stored in `error.log`.

Log files are generated by the application and are excluded from Git using `.gitignore`.

---

## Log Rotation

Winston Daily Rotate File is used to prevent log files from growing indefinitely.

The logging system automatically rotates log files according to the configured rotation strategy, keeping the log history organized and preventing excessively large files.

---

## Logger Test Endpoint

A dedicated endpoint is available to verify that the logging system is working correctly.

```http
GET /api/logger/test
```

This endpoint generates logs using all configured levels:

```text
debug
http
info
warning
error
fatal
```

After calling the endpoint, the generated logs can be checked in:

```text
Console
logs/combined.log
logs/error.log
```

The `error.log` file should contain only the `error` and `fatal` entries.

---

## Environment-Based Logging

The logger changes its behavior depending on the application environment.

### Development

Development mode provides more detailed information and allows `debug` logs to be displayed.

```env
NODE_ENV=development
```

### Production

Production mode uses a more controlled logging configuration and focuses on relevant application events such as:

```text
info
warning
error
fatal
```

The logging behavior is controlled through the application's environment configuration.

---

## Mock Data Structure

### Users

- `first_name`
- `last_name`
- `email`
- `password`
- `provider`
- `role`

### Products

- `title`
- `description`
- `code`
- `price`
- `stock`
- `status`
- `category`

### Carts

- `products`
- `quantity`
- MongoDB ObjectId references

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

Or using nodemon:

```bash
npx nodemon app.js
```

---

## Environment Variables

Create a `.env` file with the required environment variables:

```env
PORT=
MONGODB_URI=
SECRET_KEY=
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NODE_ENV=development
```

The application validates required environment variables during startup.

---

## Project Structure

```text
config/
constants/
controllers/
errors/
middlewares/
models/
repositories/
routes/
services/
strategies/
utils/
logs/
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

### Routes

Responsible for defining API endpoints and connecting them with controllers.

### Controllers

Handle HTTP requests and responses. Errors are forwarded to the global error middleware.

### Services

Contain the application's business logic and detect domain-specific errors.

### Repositories

Handle communication with MongoDB and database operations.

### Middleware

Contains reusable application logic such as authentication, authorization and centralized error handling.

### Errors

Contains custom errors and the centralized error dictionary used throughout the application.

### Utils

Contains reusable utilities such as mock data generators.

### Logger

The logger configuration is centralized in its own module and can be imported by different parts of the application.

---

## Testing Error Handling

The centralized error handling system can be tested with invalid requests.

### Invalid Product ID

Example:

```http
GET /api/products/aaaaaaaa
```

This should be handled by the application's error handling layer instead of exposing a raw database error.

### Invalid Mock Quantity

Example:

```http
GET /api/mocks/users?quantity=-5
```

Expected response:

```json
{
    "status": "error",
    "code": "INVALID_MOCK_QUANTITY",
    "message": "La cantidad de mocks es invalida"
}
```

### Duplicate Product Code

Creating a product using an existing product code should return a controlled application error.

### Duplicate User

Registering a user using an email that already exists should return a controlled application error.

---

## Git and Logs

Generated log files should not be committed to the repository.

The `logs/` directory is ignored through `.gitignore` so generated log files remain local to the application environment.

The repository should be delivered without:

```text
node_modules/
logs/*.log
.env
```

---

## Author

**Lautaro Tello**

LinkedIn:

https://linkedin.com/in/lautaro-tello-5a2832321