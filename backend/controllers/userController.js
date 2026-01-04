const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTP } = require('../utils/otpService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Send OTP for Registration
const sendRegisterOTP = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP temporarily
    req.app.locals.tempUser = { name, email, phone, otp, otpExpiry };

    // Send OTP (comment out if Twilio not configured)
    // await sendOTP(phone, otp);
    
    console.log(`OTP for ${phone}: ${otp}`); // For testing without Twilio

    res.status(200).json({ message: 'OTP sent successfully', email, phone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP and Complete Registration
const verifyRegisterOTP = async (req, res) => {
  try {
    const { email, phone, otp, password } = req.body;
    const tempUser = req.app.locals.tempUser;

    if (!tempUser || (tempUser.email !== email && tempUser.phone !== phone)) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > new Date(tempUser.otpExpiry)) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Create user
    const user = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      phone: tempUser.phone,
      password,
      isVerified: true
    });

    // Clear temporary data
    delete req.app.locals.tempUser;

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send OTP for Login
const sendLoginOTP = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // await sendOTP(user.phone, otp);
    console.log(`OTP for ${user.phone}: ${otp}`); // For testing

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login with Password
const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id); // Generate token
      
      console.log('✅ Login successful for:', user.email);
      console.log('✅ Generated token:', token);
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: token  // ← MUST RETURN TOKEN
      });
    } else {
      res.status(401).json({ message: 'Invalid email/phone or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Forget Password - Send OTP
const sendForgetPasswordOTP = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // await sendOTP(user.phone, otp);
    console.log(`OTP for ${user.phone}: ${otp}`); // For testing

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify Forget Password OTP
const verifyForgetPasswordOTP = async (req, res) => {
  try {
    const { emailOrPhone, otp, newPassword } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('addresses');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if product already in cart
    const itemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();
    res.json({ message: 'Added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();
    res.json({ message: 'Removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer info
const getCustomerInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('customerInfo');
    res.json(user.customerInfo || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update customer info
const updateCustomerInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.customerInfo = req.body;
    await user.save();
    res.json({ message: 'Customer info saved!', customerInfo: user.customerInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
