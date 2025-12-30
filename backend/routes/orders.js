import express from 'express';
import Order from '../models/Order.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
  });
  res.status(201).json(order);
});

export default router;
