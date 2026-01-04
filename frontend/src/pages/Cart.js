import React, { useContext } from 'react';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" color="#758956" mb={2}>
          🛒 Your Cart is Empty
        </Typography>
        <Button 
          variant="contained" 
          className="btn-primary-custom"
          onClick={() => navigate('/')}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="#758956" mb={4}>
        🛒 Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {cart.map((item) => (
            <Card key={item.product._id} sx={{ mb: 2, display: 'flex', p: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 2 }}
                image={item.product.images[0] || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=150'}
                alt={item.product.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {item.product.category}
                </Typography>
                <Typography variant="h6" color="#e5a177" fontWeight="bold">
                  ₹{item.product.price} x {item.quantity}
                </Typography>
              </CardContent>
              <Box display="flex" alignItems="center">
                <IconButton 
                  color="error" 
                  onClick={() => removeFromCart(item.product._id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Order Summary
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight="bold">₹{getCartTotal()}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Shipping:</Typography>
              <Typography fontWeight="bold">₹50</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={3} pt={2} borderTop="1px solid #ddd">
              <Typography variant="h6" fontWeight="bold">Total:</Typography>
              <Typography variant="h6" fontWeight="bold" color="#758956">
                ₹{getCartTotal() + 50}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              className="btn-primary-custom"
              sx={{ py: 1.5 }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
