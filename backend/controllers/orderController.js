const Order = require('../models/Order');
const User = require('../models/User');

// Create New Order
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    // Clear user's cart after order
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Seller)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.status || order.orderStatus;
      
      if (req.body.status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      if (req.body.trackingInfo) {
        order.trackingInfo = req.body.trackingInfo;
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order && order.user.toString() === req.user._id.toString()) {
      if (order.orderStatus === 'Processing') {
        order.orderStatus = 'Cancelled';
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400).json({ message: 'Order cannot be cancelled' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders (Seller)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  getAllOrders
};
