# FreshNest Backend API

Backend server for the FreshNest e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freshest
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Make sure MongoDB is running locally or update MONGODB_URI to your MongoDB connection string.

4. Seed initial products (optional):
```bash
node server/scripts/seedProducts.js
```

5. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)

### Products
- GET `/api/products` - Get all products (with optional query params: category, search, page, limit)
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Protected - Farmer/Admin only)

### Cart
- GET `/api/cart` - Get user's cart (Protected)
- POST `/api/cart` - Add item to cart (Protected)
- PUT `/api/cart/:itemId` - Update cart item quantity (Protected)
- DELETE `/api/cart/:itemId` - Remove item from cart (Protected)
- DELETE `/api/cart` - Clear cart (Protected)

### Orders
- GET `/api/orders` - Get user's orders (Protected)
- GET `/api/orders/:id` - Get single order (Protected)
- POST `/api/orders` - Create order from cart (Protected)

## Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

