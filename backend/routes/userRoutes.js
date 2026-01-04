const express = require('express');
const router = express.Router();

// Import all controller functions in ONE place
const {
  sendRegisterOTP,
  verifyRegisterOTP,
  sendLoginOTP,
  loginUser,
  sendForgetPasswordOTP,
  verifyForgetPasswordOTP,
  getUserProfile,
  addToCart,
  getCart,
  removeFromCart,
  getCustomerInfo,
  updateCustomerInfo
} = require('../controllers/userController');

// Import protect middleware ONLY ONCE
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register/send-otp', sendRegisterOTP);
router.post('/register/verify-otp', verifyRegisterOTP);
router.post('/login/send-otp', sendLoginOTP);
router.post('/login', loginUser);
router.post('/forget-password/send-otp', sendForgetPasswordOTP);
router.post('/forget-password/verify-otp', verifyForgetPasswordOTP);
router.get('/profile', protect, getUserProfile);

// Cart routes
router.post('/cart', protect, addToCart);
router.get('/cart', protect, getCart);
router.delete('/cart/:productId', protect, removeFromCart);

// Customer Info routes
router.get('/customer-info', protect, getCustomerInfo);
router.post('/customer-info', protect, updateCustomerInfo);

module.exports = router;
