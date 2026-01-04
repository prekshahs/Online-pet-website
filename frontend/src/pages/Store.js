import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { getProducts } from '../services/api';

const emojiMap = {
  'PEETS BED': '💤',
  'TOYS': '🧸'
};

const sectionOrder = ['PEETS BED', 'TOYS'];

function HorizontalScrollSection({ title, emoji, products }) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 700
        }}
      >
        <span style={{ fontSize: 32, marginRight: 14 }}>{emoji}</span>
        {title}
      </Typography>
      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        pb: 2,
        gap: 3
      }}>
        {products.map(product => (
          <Card key={product._id} sx={{ minWidth: 250, maxWidth: 250, flex: '0 0 auto', mr: 2 }}>
            <CardMedia
              component="img"
              height="180"
              image={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              sx={{ objectFit: 'contain', background: '#f5f5f5' }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="body1" component="div">
                {product.name}
              </Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
                ₹{product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default function Store() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get all products at once
    (async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch {
        setProducts([]); // fallback for no products
      }
    })();
  }, []);

  // Group by category
  const grouped = sectionOrder.reduce((acc, category) => {
    acc[category] = products.filter(p => p.category === category);
    return acc;
  }, {});

  return (
    <Box sx={{ p: { xs: 1, md: 5 }, background: '#e9d3a2', minHeight: '100vh' }}>
      {sectionOrder.map(section => grouped[section]?.length > 0 && (
        <HorizontalScrollSection
          key={section}
          title={section === "PEETS BED" ? "Bed for Pet" : "Pet Toys"}
          emoji={emojiMap[section]}
          products={grouped[section]}
        />
      ))}
    </Box>
  );
}
