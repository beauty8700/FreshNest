import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ userId: id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate userType
    const validUserTypes = ['customer', 'farmer', 'admin'];
    if (userType && !validUserTypes.includes(userType)) {
      return res.status(400).json({ message: `userType must be one of: ${validUserTypes.join(', ')}` });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User with this email already exists' });

    const user = await User.create({ 
      name, 
      email, 
      password, 
      phone,
      userType: userType || 'customer' 
    });
    res.status(201).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/me', authenticate, async (req, res) => {
  res.json(req.user);
});

export default router;
