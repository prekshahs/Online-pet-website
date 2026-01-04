import React, { useState, useContext } from 'react';
import { Container, Paper, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    pincode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderItems = cart.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.images[0],
      price: item.product.price,
      product: item.product._id
    }));

    const orderData = {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice: 0,
      shippingPrice: 50,
      totalPrice: getCartTotal() + 50
    };

    try {
      const { data } = await createOrder(orderData);
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (error) {
      alert('Error creating order: ' + error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Checkout</Typography>
        
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mt: 3 }}>Shipping Address</Typography>
          <TextField
            fullWidth
            label="Street Address"
            name="street"
            value={shippingAddress.street}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={shippingAddress.pincode}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Typography variant="h6" sx={{ mt: 3 }}>Payment Method</Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel value="ONLINE" control={<Radio />} label="Online Payment" />
            <FormControlLabel value="BANK_TRANSFER" control={<Radio />} label="Bank Transfer" />
          </RadioGroup>

          <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography>Subtotal: ₹{getCartTotal().toFixed(2)}</Typography>
            <Typography>Shipping: ₹50.00</Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              Total: ₹{(getCartTotal() + 50).toFixed(2)}
            </Typography>
          </Box>

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ mt: 3 }}
          >
            Place Order
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Checkout;
