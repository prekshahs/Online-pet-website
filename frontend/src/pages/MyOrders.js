import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Box, Chip } from '@mui/material';
import { getUserOrders } from '../services/api';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing': return 'warning';
      case 'Importing': return 'info';
      case 'Delivering': return 'primary';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="#758956" mb={4}>
        📦 My Orders
      </Typography>

      {orders.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="#666">
            No orders yet. Start shopping!
          </Typography>
        </Box>
      ) : (
        orders.map((order) => (
          <Card key={order._id} sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Order #{order._id.substring(0, 8)}
                </Typography>
                <Chip 
                  label={order.orderStatus} 
                  color={getStatusColor(order.orderStatus)}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="h6" color="#758956" fontWeight="bold">
                Total: ₹{order.totalPrice}
              </Typography>
              {order.trackingInfo && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Tracking: {order.trackingInfo}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default MyOrders;
