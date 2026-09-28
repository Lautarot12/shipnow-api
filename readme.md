# ShipNow API

Backend API developed with Node.js, Express and MongoDB for managing users, products, carts and shipments.

The project integrates authentication and authorization, GitHub OAuth, mock data generation, centralized error handling, Winston logging, Swagger/OpenAPI documentation, functional testing, file uploads with Multer, pagination, health checks and Docker-based execution.

---

## Overview

ShipNow API follows a layered backend architecture focused on separation of responsibilities, maintainability and scalability.

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Models
    ↓
MongoDB
```

The project can be executed locally or in a containerized environment using Docker Compose.

---

## Main Features

### Authentication and Authorization

- User registration
- Local authentication
- GitHub OAuth authentication
- JWT authentication
- HTTP-only cookies
- Protected routes
- User profile
- Session validation
- Role-based access control
- Admin-only endpoint
- Logout

### Products

- Product creation
- Product listing
- Product retrieval by ID
- Product update
- Product deletion
- Pagination
- Maximum result limits
- Category filters
- Status filters
- Price sorting

### Carts

- Cart creation
- Cart retrieval
- Add products to cart
- Clear cart
- Product quantity management
- MongoDB relationships

### Mock Data

- Generate mock users
- Generate mock products
- Generate mock carts
- Generate and insert mock data into MongoDB
- Product and cart relationships
- Validation of mock quantities
- Centralized errors for invalid mock quantities

### Shipments

- Create shipments
- List shipments
- Pagination and result limits
- Filter shipments by status
- Filter shipments by user
- Retrieve shipments by ID
- Update shipments
- Delete shipments
- Tracking number lookup
- Unique tracking numbers
- Shipment status validation
- Shipment receipts with file uploads

### File Uploads

The API supports document and receipt uploads using Multer.

Supported file types:

```text
PDF
JPEG
PNG
```

Maximum file size:

```text
5 MB
```

User documents are associated with users and stored under:

```text
uploads/users/
```

Shipment receipts are associated with shipments and stored under:

```text
uploads/shipments/
```

Only file metadata is stored in MongoDB.

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
- Multer
- Winston
- Swagger / OpenAPI
- Swagger UI Express
- Mocha
- Chai
- Supertest
- Socket.IO
- Docker
- Docker Compose

---

## Architecture

The application follows a layered architecture:

```text
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Models
    ↓
MongoDB
```

### Routes

Routes define HTTP endpoints and connect requests with controllers.

They do not contain direct MongoDB access or business logic.

### Controllers

Controllers handle HTTP requests and responses.

They receive request data, call services and return the appropriate HTTP response.

Errors are forwarded to the global error middleware.

### Services

Services contain the application's business logic.

Examples include:

- Resource existence validation
- Duplicate tracking validation
- Shipment status validation
- User existence validation
- Mock quantity validation
- File validation
- Pagination limits

### Repositories

Repositories contain MongoDB access.

Database operations are isolated inside repositories instead of being performed directly from routes.

### Models

Mongoose models define database schemas and relationships.

### Middleware

Reusable application middleware includes:

- Authentication
- Authorization
- Global error handling
- File upload handling

### Configuration

Environment variables are centralized through the application's environment configuration module.

---

## Environment Variables

Create a `.env` file based on `.env.example`.

Required variables:

```env
PORT=8080
MONGODB_URI=
NODE_ENV=development
SECRET_KEY=
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
LOG_LEVEL=debug
GITHUB_CALLBACK_URL=http://localhost:8080/api/v1/auth/github/callback
```

Sensitive values such as database credentials, JWT secrets and GitHub credentials must not be committed to the repository.

The application validates required environment variables during startup.

If a required variable is missing, the application fails during initialization instead of starting with incomplete configuration.

---

## Local Installation

Clone the repository:

```bash
git clone https://github.com/Lautarot12/shipnow-api.git
```

Move into the project directory:

```bash
cd shipnow-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a template.

---

## Running Locally

### Development

```bash
npm run dev
```

This starts the application using Node.js watch mode.

### Production

```bash
npm start
```

The production start command runs:

```bash
node server.js
```

---

## Testing

Functional tests are implemented using:

- Mocha
- Chai
- Supertest

Tests use an independent testing environment configured through:

```text
.env.test
```

Run the complete test suite with:

```bash
npm test
```

The test suite covers authentication, sessions, authorization, products, carts, mock generation, invalid mock quantities, health check, Swagger availability, shipments, tracking, duplicate tracking validation, user document uploads, shipment receipt uploads and upload validation errors.

---

## Swagger / OpenAPI

Interactive API documentation is available at:

```text
http://localhost:8080/api/docs
```

Swagger documents the main API modules, request parameters, request bodies, responses, error responses and reusable schemas.

### Documented Modules

- Users
- Products
- Carts
- Shipments
- Mocks
- Logger
- Health

### Reusable Schemas

- User
- Product
- Cart
- CartItem
- Document
- Receipt
- Shipment
- ErrorResponse
- SuccessResponse

---

## Health Check

The API provides a public health check endpoint:

```http
GET /api/health
```

Example response:

```json
{
    "status": "ok",
    "environment": "development",
    "uptime": 123.45,
    "timestamp": "2026-09-28T12:00:00.000Z"
}
```

The health check only exposes basic operational information and does not expose secrets, database credentials or authentication data.

---

## Authentication Endpoints

### Register

```http
POST /api/v1/auth/register
```

### Login

```http
POST /api/v1/auth/login
```

### Logout

```http
POST /api/v1/auth/logout
```

### Profile

```http
GET /api/v1/auth/profile
```

### Session

```http
GET /api/v1/auth/session
```

### Admin

```http
GET /api/v1/auth/admin
```

### GitHub OAuth

```http
GET /api/v1/auth/github
GET /api/v1/auth/github/callback
```

### Upload User Document

```http
POST /api/v1/auth/{uid}/documents
```

Request type:

```text
multipart/form-data
```

Required fields:

```text
file
documentType
```

Allowed document types:

```text
DNI
PASAPORTE
LICENCIA
```

---

## Products Endpoints

```http
GET    /api/products
POST   /api/products
GET    /api/products/{pid}
PUT    /api/products/{pid}
DELETE /api/products/{pid}
```

The product listing supports pagination, filtering and sorting.

Query parameters:

```text
page
limit
sort
query
```

Example:

```http
GET /api/products?page=1&limit=10&sort=asc&query=frescos
```

The API limits the maximum number of products returned per page to 100.

---

## Carts Endpoints

```http
POST   /api/carts
GET    /api/carts/{cid}
POST   /api/carts/{cid}/product/{pid}
DELETE /api/carts/{cid}
```

---

## Shipments Endpoints

```http
GET    /api/shipments
POST   /api/shipments
GET    /api/shipments/{sid}
PUT    /api/shipments/{sid}
DELETE /api/shipments/{sid}
GET    /api/shipments/tracking/{trackingNumber}
POST   /api/shipments/{sid}/receipt
```

### Shipment Pagination

The shipment listing supports pagination.

Example:

```http
GET /api/shipments?page=1&limit=10
```

Maximum page size:

```text
100
```

### Shipment Filters

Filter by status:

```http
GET /api/shipments?status=IN_TRANSIT
```

Filter by user:

```http
GET /api/shipments?user=507f1f77bcf86cd799439011
```

### Shipment Statuses

```text
PENDING
PREPARING
IN_TRANSIT
DELIVERED
CANCELLED
```

### Tracking

```http
GET /api/shipments/tracking/{trackingNumber}
```

Tracking numbers are unique.

### Shipment Receipt Upload

```http
POST /api/shipments/{sid}/receipt
```

Request type:

```text
multipart/form-data
```

Required field:

```text
file
```

Allowed file types:

```text
PDF
JPEG
PNG
```

Maximum file size:

```text
5 MB
```

The uploaded file is associated with the shipment and its metadata is stored in MongoDB.

---

## Mock Endpoints

Mock endpoints are available outside production environments.

### Mock Users

```http
GET /api/mocks/users?quantity=20
```

### Mock Products

```http
GET /api/mocks/products?quantity=20
```

### Mock Carts

```http
GET /api/mocks/carts?quantity=10
```

The `quantity` parameter must be a positive integer.

Invalid values such as zero, negative numbers, non-integers or non-numeric values are rejected with the centralized error handling system.

### Generate and Insert Mock Data

```http
POST /api/mocks/generate
```

Example request:

```json
{
    "users": 20,
    "products": 50,
    "carts": 15
}
```

This endpoint generates users, products and carts and persists them in MongoDB.

Generated carts maintain relationships with generated products.

---

## Internal Endpoints

The following endpoints are considered internal development and testing tools:

```text
/api/mocks
/api/logger
```

They are available in development and testing environments.

They are disabled in production.

Swagger and the health check remain available in production.

This behavior is controlled according to the application environment.

---

## Error Handling

ShipNow API uses a centralized error handling system.

The application includes:

- Custom errors
- Centralized error dictionary
- Global error middleware
- Domain-specific error codes
- Consistent JSON error responses
- Winston logging integration

Example:

```json
{
    "status": "error",
    "code": "SHIPMENT_NOT_FOUND",
    "message": "Envío no encontrado"
}
```

Examples of domain-specific error codes include:

```text
PRODUCT_NOT_FOUND
USER_NOT_FOUND
SHIPMENT_NOT_FOUND
INVALID_ID
DUPLICATE_PRODUCT_CODE
DUPLICATE_TRACKING_NUMBER
INVALID_SHIPMENT_STATUS
INVALID_MOCK_QUANTITY
MISSING_FILE
INVALID_FILE_TYPE
FILE_TOO_LARGE
INVALID_DOCUMENT_TYPE
UNEXPECTED_FILE
FILE_SAVE_ERROR
```

Unexpected errors are returned using a consistent internal server error structure.

---

## File Upload Handling

Multer is centralized in:

```text
config/multer.config.js
```

The upload configuration defines:

- Storage destination
- Generated filenames
- Allowed MIME types
- Maximum file size
- Upload error handling

Allowed MIME types:

```text
application/pdf
image/jpeg
image/png
```

Maximum file size:

```text
5 MB
```

### User Documents

Stored under:

```text
uploads/users/
```

### Shipment Receipts

Stored under:

```text
uploads/shipments/
```

MongoDB stores file metadata instead of the file contents.

Example metadata:

```json
{
    "originalName": "receipt.pdf",
    "fileName": "1727891234567-receipt.pdf",
    "path": "uploads/shipments/1727891234567-receipt.pdf",
    "mimeType": "application/pdf",
    "size": 245678,
    "uploadedAt": "2026-09-28T12:00:00.000Z"
}
```

Generated upload files must not be committed to Git.

---

## Logging

ShipNow API uses Winston as a centralized logging system.

Supported levels:

```text
debug
http
info
warning
error
fatal
```

The logger records important application events such as:

- Server startup
- MongoDB connection
- MongoDB connection failures
- Mock generation
- Invalid mock quantities
- Application errors
- File upload errors
- Invalid file types
- Successful file uploads
- Shipment receipt associations

---

## Log Files

Application logs are stored under:

```text
logs/
├── combined.log
└── error.log
```

### combined.log

Contains general application activity according to the configured `LOG_LEVEL`.

### error.log

Contains error-level and fatal-level events.

Generated log files are excluded from Git.

---

## Environment-Based Logging

Logging behavior changes according to the application environment.

### Development

Console logging is enabled and can use a detailed level such as:

```env
NODE_ENV=development
LOG_LEVEL=debug
```

### Test

Testing can use a quieter logging level such as:

```env
NODE_ENV=test
LOG_LEVEL=warning
```

### Production

Production uses controlled file logging without the development console transport.

A typical production configuration is:

```env
NODE_ENV=production
LOG_LEVEL=info
```

---

## Performance and Scalability

The API implements basic performance protections.

### Pagination

Products and shipments support pagination and controlled page sizes.

Maximum page size:

```text
100
```

### Filters

Shipment listings support filters by:

```text
status
user
```

Product listings support filters by:

```text
category
status
```

### Sorting

Products support price sorting:

```text
asc
desc
```

### Payload Limits

Express JSON and URL-encoded payloads are limited to:

```text
1 MB
```

File uploads are limited to:

```text
5 MB
```

### Database Queries

List endpoints use filtering, pagination and controlled result sizes to avoid returning complete collections without limits.

Read operations use lean queries where appropriate to reduce unnecessary Mongoose document overhead.

---

## Docker

The project includes a multi-stage Dockerfile designed for production-oriented execution.

### Dockerfile

The Docker image:

- Uses Node.js Alpine
- Uses a multi-stage build
- Installs production dependencies with `npm ci --omit=dev`
- Copies the application source
- Creates the required runtime directories
- Exposes port `8080`
- Starts the application with `npm start`

### Build the Image

```bash
docker build -t shipnow-api .
```

### Run the API Container

```bash
docker run --rm --env-file .env -p 8080:8080 shipnow-api
```

The container receives environment variables externally rather than embedding the real `.env` file into the image.

---

## Docker Compose

The project includes `docker-compose.yml` with:

```text
ShipNow API
MongoDB
```

MongoDB includes a health check.

The API waits until MongoDB reports a healthy status before starting.

### Start the Full Stack

```bash
docker compose up --build
```

The API is available at:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/api/docs
```

Health check:

```text
http://localhost:8080/api/health
```

### Stop the Stack

```bash
docker compose down
```

### Persistent Docker Volumes

Docker Compose uses volumes for:

```text
mongo-data
shipnow-uploads
shipnow-logs
```

This keeps MongoDB data, uploads and runtime logs outside the application image.

---

## Docker Security and File Exclusions

The project includes `.dockerignore` to prevent unnecessary or sensitive files from entering the Docker build context.

Excluded files include:

```text
node_modules/
.env
.env.*
.git/
logs/
uploads/
coverage/
*.log
.vscode/
.idea/
npm-debug.log*
```

`.env.example` is kept as a configuration template.

---

## Git Repository Rules

The following files and directories must not be committed:

```text
node_modules/
.env
.env.test
logs/*.log
uploads/*
coverage/
temporary files
```

The project uses `.gitignore` and `.dockerignore` to prevent local or sensitive files from being included in the repository or Docker build context.

The `uploads/` directory should remain clean before submitting the project.

---

## Project Structure

```text
shipnow-api/
│
├── config/
│   ├── db.js
│   ├── env.config.js
│   ├── logger.config.js
│   ├── multer.config.js
│   ├── swagger.config.js
│   └── swagger.schemas.js
│
├── constants/
│
├── controllers/
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── mock.controller.js
│   ├── product.controller.js
│   └── shipment.controller.js
│
├── errors/
│   ├── CustomError.js
│   └── error.dictionary.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── cart.model.js
│   ├── product.model.js
│   ├── shipment.model.js
│   └── user.model.js
│
├── repositories/
│   ├── auth.repository.js
│   ├── cart.repository.js
│   ├── mocks.repository.js
│   ├── product.repository.js
│   └── shipment.repository.js
│
├── routes/
│   ├── auth.routes.js
│   ├── carts.routes.js
│   ├── health.routes.js
│   ├── logger.routes.js
│   ├── mocks.routes.js
│   ├── products.routes.js
│   ├── shipments.routes.js
│   └── views.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── cart.service.js
│   ├── mocks.service.js
│   ├── product.service.js
│   └── shipment.service.js
│
├── strategies/
│   ├── github.strategy.js
│   └── local.strategy.js
│
├── tests/
│   └── functional.test.js
│
├── utils/
│
├── uploads/
│   ├── users/
│   └── shipments/
│
├── logs/
├── views/
├── public/
│
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── server.js
└── app.js
```

---

## Running the Complete Stack

### Local Development

```bash
npm install
npm run dev
```

### Production

```bash
npm start
```

### Tests

```bash
npm test
```

### Docker Image

```bash
docker build -t shipnow-api .
```

### Docker Compose

```bash
docker compose up --build
```

### Swagger

```text
http://localhost:8080/api/docs
```

### Health Check

```text
http://localhost:8080/api/health
```

---

## Production Checklist

Before deploying or submitting the project, verify:

```text
[ ] .env is not committed
[ ] .env.test is not committed
[ ] node_modules is not committed
[ ] logs are cleaned
[ ] uploads are cleaned
[ ] coverage is cleaned
[ ] .env.example contains all required variables
[ ] npm test passes
[ ] Swagger loads correctly
[ ] Health check works
[ ] Docker image builds successfully
[ ] Docker Compose starts MongoDB and the API
[ ] API waits for MongoDB health
[ ] Mock endpoints are disabled in production
[ ] Logger test endpoint is disabled in production
```

---

## Author

**Lautaro Tello**

GitHub:

https://github.com/Lautarot12

LinkedIn:

https://linkedin.com/in/lautaro-tello-5a2832321