import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <CardMedia
        component="img"
        className="product-image"
        image={product.images[0] || 'https://via.placeholder.com/300x250?text=Pet+Product'}
        alt={product.name}
      />
      <CardContent>
        <Typography className="product-name" gutterBottom>
          {product.name}
        </Typography>
        <Typography className="product-price" variant="h5">
          ₹{product.price}
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            className="btn-primary-custom"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
