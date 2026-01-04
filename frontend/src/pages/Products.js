import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts(category);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Sample products for testing
      setProducts([
        { 
          _id: '1', 
          name: 'Sample Product 1', 
          price: 500, 
          images: ['https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&h=250'], 
          category 
        },
        { 
          _id: '2', 
          name: 'Sample Product 2', 
          price: 1000, 
          images: ['https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=300&h=250'], 
          category 
        },
      ]);
    }
  };

  const getCategoryEmoji = (cat) => {
    switch(cat) {
      case 'PETS': return '🐾';
      case 'PEET FOODS': return '🍖';
      case 'TOYS': return '🎾';
      case 'PEETS BED': return '🛏️';
      default: return '🐶';
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight="bold" color="#758956">
          {getCategoryEmoji(category)} {category}
        </Typography>
        <Typography variant="h6" color="#666" mt={2}>
          Browse our collection of {category?.toLowerCase()}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography textAlign="center" variant="h6" color="#666">
              No products found in this category
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Products;
