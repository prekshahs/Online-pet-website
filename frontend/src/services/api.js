import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000/api' 
});

// Add token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User APIs
export const sendRegisterOTP = (formData) => API.post('/users/register/send-otp', formData);
export const verifyRegisterOTP = (formData) => API.post('/users/register/verify-otp', formData);
export const sendLoginOTP = (formData) => API.post('/users/login/send-otp', formData);
export const loginUser = (formData) => API.post('/users/login', formData);
export const sendForgetPasswordOTP = (formData) => API.post('/users/forget-password/send-otp', formData);
export const verifyForgetPasswordOTP = (formData) => API.post('/users/forget-password/verify-otp', formData);
export const getUserProfile = () => API.get('/users/profile');

// Product APIs
export const getProducts = (category) => API.get(`/products${category ? `?category=${category}` : ''}`);
export const getProductById = (id) => API.get(`/products/${id}`);
export const searchProducts = (keyword) => API.get(`/products/search?keyword=${keyword}`);

// Cart APIs
export const addToCart = (data) => API.post('/users/cart', data);
export const getCart = () => API.get('/users/cart');
export const removeFromCart = (productId) => API.delete(`/users/cart/${productId}`);

// Order APIs
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getUserOrders = () => API.get('/orders/myorders');
export const getOrderById = (id) => API.get(`/orders/${id}`);

export default API;