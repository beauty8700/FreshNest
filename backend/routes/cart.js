import express from 'express';
import Cart from '../models/Cart.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: req.user._id });
  res.json(cart);
});

router.post('/add', authenticate, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

router.delete('/remove/:productId', authenticate, async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

router.put('/update/:productId', authenticate, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  const item = cart.items.find(item => item.product.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });
  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

router.delete('/clear', authenticate, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = [];
  await cart.save();
  res.json(cart);
});

export default router;
