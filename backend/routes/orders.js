import express from 'express';
import Order from '../models/Order.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.userType === 'farmer') {
      return res.status(403).json({ message: 'Farmers cannot create orders. Please use the farmer dashboard to view orders for your products.' });
    }

    const order = await Order.create({
      user: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });
    await order.populate('items.product');
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-orders', authenticate, async (req, res) => {
  try {
    if (req.user.userType === 'farmer') {
      return res.status(403).json({ message: 'Farmers should use /api/orders/farmer-orders to view orders for their products.' });
    }

    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    const transformedOrders = orders.map(order => ({
      ...order.toObject(),
      status: order.orderStatus,
    }));
    res.json(transformedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/farmer-orders', authenticate, authorize('farmer'), async (req, res) => {
  try {

    const allOrders = await Order.find()
      .populate({
        path: 'items.product',
        populate: { path: 'farmer', select: 'name email _id' }
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    const farmerOrders = allOrders.filter(order => {
      return order.items.some(item => {
        const product = item.product;
        return product && product.farmer && product.farmer._id.toString() === req.user._id.toString();
      });
    });

    const transformedOrders = farmerOrders.map(order => {
      const orderObj = order.toObject();
      orderObj.items = order.items.filter(item => {
        const product = item.product;
        return product && product.farmer && product.farmer._id.toString() === req.user._id.toString();
      });
      orderObj.totalAmount = orderObj.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      orderObj.status = order.orderStatus;
      return orderObj;
    });

    res.json(transformedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/farmer-orders/:orderId/status', authenticate, authorize('farmer'), async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus || !['pending', 'processing', 'delivered'].includes(orderStatus)) {
      return res.status(400).json({ message: 'Valid orderStatus (pending, processing, delivered) is required' });
    }

    const order = await Order.findById(orderId)
      .populate({
        path: 'items.product',
        populate: { path: 'farmer', select: '_id' }
      });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const hasFarmerProducts = order.items.some(item => {
      const product = item.product;
      return product && product.farmer && product.farmer._id.toString() === req.user._id.toString();
    });

    if (!hasFarmerProducts) {
      return res.status(403).json({ message: 'Access denied. This order does not contain your products.' });
    }

    order.orderStatus = orderStatus;
    await order.save();

    await order.populate('items.product');
    await order.populate('user', 'name email');

    res.json({
      ...order.toObject(),
      status: order.orderStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
