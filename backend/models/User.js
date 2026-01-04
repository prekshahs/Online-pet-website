const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define customerInfoSchema FIRST (before userSchema uses it)
const customerInfoSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  address: String,
  state: String,
  district: String,
  house: String,
  phoneNo: String,
  altPhoneNo: String,
  profilePicUrl: String,
  otp: String
}, { _id: false });

// Define userSchema SECOND (after customerInfoSchema is defined)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  earnedPoints: { type: Number, default: 0 },
  smileyWallet: { type: Number, default: 0 },
  isBusinessSeller: { type: Boolean, default: false },
  // Add customerInfo field here
  customerInfo: customerInfoSchema,

  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
