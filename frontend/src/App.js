import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Account from './pages/AccountInfo';
import MyOrders from './pages/MyOrders';
import CustomerInfo from './pages/CustomerInfo';
import AddAddress from './pages/AddAddress';
import './App.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/store" element={<Store />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/customer-info" element={<CustomerInfo />} />
              <Route path="/add-address" element={<AddAddress />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
