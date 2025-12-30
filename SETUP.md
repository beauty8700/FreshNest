# Quick Setup Guide

## Step 1: Install Dependencies

### Frontend
```bash
npm install
```

### Backend
```bash
cd server
npm install
```

## Step 2: Setup Environment Variables

### Backend (.env in server folder)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freshest
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Frontend (.env in root folder)
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB

### Option A: Local MongoDB
Start your local MongoDB service:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Option B: MongoDB Atlas
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in server/.env

## Step 4: Seed Products (Optional)

```bash
cd server
node scripts/seedProducts.js
```

## Step 5: Start the Application

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend
```bash
npm run dev
```

## Step 6: Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Test Account

After seeding, you can create a new account or use the registration page to sign up.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
- Change `PORT` in server/.env to a different port (e.g., 5001)
- Update `VITE_API_URL` in root `.env` accordingly

### API Not Connecting
- Check that backend server is running
- Verify `VITE_API_URL` matches backend port
- Check browser console for CORS errors

## Next Steps

1. Create an account
2. Browse products
3. Add items to cart
4. Place an order
5. Check your dashboard for order history

