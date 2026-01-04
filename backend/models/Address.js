const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alternativePhone: { type: String },
  address: { type: String, required: true },
  houseNo: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
