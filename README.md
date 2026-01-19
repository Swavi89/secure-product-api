# Secure RESTful API

A secure RESTful API built with Node.js, Express, SQLite, and JWT authentication supporting user registration, login, and product CRUD operations.

## Features

- **User Authentication**: Secure registration with crypto tokens and login
- **Password Security**: Bcrypt password hashing
- **Product Management**: Full CRUD operations for products
- **SQLite Database**: Lightweight, serverless database
- **Input Validation**: Request validation middleware
- **Error Handling**: Comprehensive error handling

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **SQLite3**: Database
- **Crypto**: One time token generation
- **Bcrypt**: Password hashing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Initialize the database:

```bash
npm run init-db
```

4. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Products (Protected Routes)

All product endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

#### Get All Products

```http
GET /api/v1/products

```

**Response:**

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product 1",
      "description": "Description here",
      "price": 29.99,
      "stock": 100,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Product by ID

```http
GET /api/v1/products/:id

```

#### Create Product

```http
POST /api/v1/products

Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 49.99,
  "stock": 50
}
```

#### Update Product

```http
PUT /api/v1/products/:id

Content-Type: application/json

{
  "name": "Updated Product",
  "description": "Updated description",
  "price": 59.99,
  "stock": 75
}
```

#### Delete Product

```http
DELETE /api/v1/products/:id

```

## Project Structure

```
project-root/
│
├── src/
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── modules/
│   │   ├── auth/
│   │   │     ├── auth.controller.js     # Auth controller
│   │   │     ├── auth.repository.js     # Auth repository
│   │   │     ├── auth.routes.js         # Auth routes
│   │   │     └── auth.service.js        # Auth service
│   │   ├── product/
│   │   │     ├── product.controller.js  # Product controller
│   │   │     ├── product.repository.js  # Product repository
│   │   │     ├── product.routes.js      # Product routes
│   │   │     └── product.service.js     # Product service
│   ├── app.js                    # Express app setup
│   └── server.js                 # Express server setup
│
├── database.sqlite           # SQLite database file
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Database Schema

### Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  token TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TRIGGER IF NOT EXISTS update_users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  UPDATE users 
  SET updated_at = CURRENT_TIMESTAMP 
  WHERE id = OLD.id;
END
```

### Products Table

```sql
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name VARCHAR(100) NOT NULL,
  product_quantity VARCHAR(10) NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TRIGGER IF NOT EXISTS update_products_updated_at
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  UPDATE products 
  SET updated_at = CURRENT_TIMESTAMP 
  WHERE id = OLD.id;
END
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **Crypto Token**: One Time Create token using Crypto Web Token
- **Input Validation**: Request data validation to prevent injection attacks
- **Error Handling**: Secure error messages that don't leak sensitive information

## Testing with cURL

### Register a user

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123456"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'
```

### Create a product (replace TOKEN with your JWT)

```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name":"Test Product","description":"A test product","price":29.99,"stock":100}'
```

### Get all products

```bash
curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer TOKEN"
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Development

### Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon
- `npm run init-db`: Initialize the database schema

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue in the GitHub repository.

## Acknowledgments

- Express.js documentation
- SQLite documentation
