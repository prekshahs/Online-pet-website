const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  }],
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['Smiley Payment', 'Earned Points', 'Cash on Delivery', 'Bank Transfer', 'Online Payment']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String
  },
  totalPrice: { type: Number, required: true },
  taxPrice: { type: Number, default: 0 },
  shippingPrice: { type: Number, default: 0 },
  orderStatus: { 
    type: String, 
    default: 'Processing',
    enum: ['Processing', 'Importing', 'Delivering', 'Delivered', 'Cancelled']
  },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  trackingInfo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
