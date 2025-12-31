import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get farmer statistics (protected - farmers only)
router.get('/stats', authenticate, authorize('farmer'), async (req, res) => {
  try {
    const farmerId = req.user._id;

    // Get product statistics
    const totalProducts = await Product.countDocuments({ farmer: farmerId });
    const activeProducts = await Product.countDocuments({ 
      farmer: farmerId, 
      isActive: true 
    });
    const totalStock = await Product.aggregate([
      { $match: { farmer: farmerId } },
      { $group: { _id: null, total: { $sum: '$stock' } } }
    ]);

    // Get order statistics
    const allOrders = await Order.find()
      .populate({
        path: 'items.product',
        populate: { path: 'farmer', select: '_id' }
      });

    const farmerOrders = allOrders.filter(order => {
      return order.items.some(item => {
        const product = item.product;
        return product && product.farmer && product.farmer._id.toString() === farmerId.toString();
      });
    });

    const totalOrders = farmerOrders.length;
    const pendingOrders = farmerOrders.filter(o => o.orderStatus === 'pending').length;
    const processingOrders = farmerOrders.filter(o => o.orderStatus === 'processing').length;
    const deliveredOrders = farmerOrders.filter(o => o.orderStatus === 'delivered').length;

    // Calculate total revenue
    const totalRevenue = farmerOrders.reduce((sum, order) => {
      const orderItems = order.items.filter(item => {
        const product = item.product;
        return product && product.farmer && product.farmer._id.toString() === farmerId.toString();
      });
      return sum + orderItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
    }, 0);

    // Get recent orders (last 5)
    const recentOrders = farmerOrders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(order => ({
        _id: order._id,
        totalAmount: order.items
          .filter(item => {
            const product = item.product;
            return product && product.farmer && product.farmer._id.toString() === farmerId.toString();
          })
          .reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      }));

    res.json({
      products: {
        total: totalProducts,
        active: activeProducts,
        inactive: totalProducts - activeProducts,
        totalStock: totalStock[0]?.total || 0,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        processing: processingOrders,
        delivered: deliveredOrders,
      },
      revenue: {
        total: totalRevenue,
      },
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

