import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI } from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

 const fetchCart = async () => {
  try {
    const { data } = await getCart();
    setCart(data);
  } catch (error) {
    // Ignore 401 errors (user not logged in)
    if (error.response?.status !== 401) {
      console.error('Error fetching cart:', error);
    }
  }
};


  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartAPI({ productId, quantity });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartAPI(productId);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      clearCart,
      getCartTotal,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
