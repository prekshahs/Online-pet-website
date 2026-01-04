import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Paper } from '@mui/material';
import { getProductById } from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    addToCart(product._id, quantity);
    alert('Added to cart!');
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img 
            src={product.images[0] || 'https://via.placeholder.com/400'} 
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            ₹{product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Stock: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
