const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { 
    type: String, 
    required: true,
    enum: ['PETS', 'PEET FOODS', 'TOYS', 'PEETS BED']
  },
  subcategory: { type: String },
  countInStock: { type: Number, required: true, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
