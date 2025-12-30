# FreshNest - Farm-to-Table E-Commerce Platform

A modern, full-stack e-commerce platform connecting local farmers with customers. Built with React, Node.js, Express, and MongoDB.

## Project Structure

```
FreshNest/
├── backend/                # Backend server (Node.js + Express + MongoDB)
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── scripts/           # Utility scripts
│   ├── server.js          # Server entry point
│   ├── package.json       # Backend dependencies
│   └── .env              # Backend environment variables
│
├── frontend/              # Frontend application (React + Vite)
│   ├── src/              # Source files
│   │   ├── components/   # React components
│   │   ├── context/      # Context providers
│   │   ├── pages/        # Page components
│   │   └── assets/       # Static assets
│   ├── public/           # Public assets
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│   └── .env             # Frontend environment variables
│
└── README.md             # This file
```

## Features

### Frontend
- 🛍️ **Product Browsing** - Browse fresh vegetables, fruits, and grains
- 🔍 **Search & Filter** - Search products and filter by category
- 🛒 **Shopping Cart** - Add items to cart and manage quantities
- 👤 **User Authentication** - Secure login and registration
- 📦 **Order Management** - View order history and track orders
- 💳 **Checkout Process** - Smooth checkout with address management
- 📱 **Responsive Design** - Mobile-friendly interface

### Backend
- 🔐 **JWT Authentication** - Secure user authentication
- 📊 **RESTful API** - Clean API structure
- 🗄️ **MongoDB Database** - Efficient data storage
- 🛡️ **Protected Routes** - Secure API endpoints
- 📝 **Order System** - Complete order management

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Environment Setup**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freshest
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start MongoDB**
Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in the backend `.env` file.

5. **Seed Products (Optional)**
```bash
cd backend
node scripts/seedProducts.js
```

## Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Backend:**
```bash
cd backend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Protected - Farmer/Admin)

### Cart
- `GET /api/cart` - Get user's cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)

### Orders
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `POST /api/orders` - Create order from cart (Protected)

## Usage

1. **Register/Login**: Create an account or login to start shopping
2. **Browse Products**: Explore fresh produce in the shop
3. **Add to Cart**: Click on products to add them to your cart
4. **Checkout**: Review your cart and place an order
5. **Track Orders**: View your order history in the dashboard

## User Roles

- **Customer**: Browse and purchase products
- **Farmer**: Create and manage product listings
- **Admin**: Full system access

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in `backend/.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
- Change `PORT` in `backend/.env` to a different port (e.g., 5001)
- Update `VITE_API_URL` in `frontend/.env` accordingly

### API Not Connecting
- Check that backend server is running
- Verify `VITE_API_URL` matches backend port
- Check browser console for CORS errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
