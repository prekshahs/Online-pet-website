import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { getToken } from '../utils/auth';


const COLORS = {
  green: '#758956',
  cream: '#e9d3a2',
  white: '#fff'
};

function AddAddress() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    alternativePhone: '',
    address: '',
    houseNo: '',
    district: '',
    state: ''
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    console.log('AddAddress component mounted');
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = getToken();
      console.log('Token:', token ? 'Found' : 'Not found');
      
      if (!token) {
        console.log('No token, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('Fetching addresses from:', `${API_URL}/api/addresses`);
      const res = await axios.get(`${API_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Addresses fetched:', res.data);
      setAddresses(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      console.error('Error response:', error.response);
      setError('Failed to load addresses');
      setLoading(false);
      
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();

      if (editingId) {
        await axios.put(`${API_URL}/api/addresses/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Address updated successfully!');
      } else {
        await axios.post(`${API_URL}/api/addresses`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Address added successfully!');
      }

      resetForm();
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      alert(error.response?.data?.message || 'Failed to save address');
    }
  };

  const handleEdit = (addr) => {
    setFormData({
      fname: addr.fname,
      lname: addr.lname,
      email: addr.email,
      phone: addr.phone,
      alternativePhone: addr.alternativePhone || '',
      address: addr.address,
      houseNo: addr.houseNo,
      district: addr.district,
      state: addr.state
    });
    setEditingId(addr._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Address deleted successfully!');
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address');
    }
  };

  const resetForm = () => {
    setFormData({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      alternativePhone: '',
      address: '',
      houseNo: '',
      district: '',
      state: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', background: COLORS.cream, py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Loading addresses...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: COLORS.cream, py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600, color: '#000' }}>
          Add Address
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#000' }}>
          Yashuo address:
        </Typography>

        {/* Display existing addresses */}
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <Box
              key={addr._id}
              sx={{
                mb: 2,
                bgcolor: COLORS.white,
                borderRadius: 3,
                p: 3,
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ pr: 8 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                  {addr.fname} {addr.lname}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.3 }}>{addr.email}</Typography>
                <Typography variant="body2" sx={{ mb: 0.3 }}>
                  {addr.address} {addr.houseNo}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.3 }}>
                  {addr.district}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.3 }}>{addr.state}</Typography>
                <Typography variant="body2" sx={{ mb: 0.3 }}>{addr.phone}</Typography>
                {addr.alternativePhone && (
                  <Typography variant="body2" sx={{ mb: 0.3 }}>{addr.alternativePhone}</Typography>
                )}
                <Typography variant="body2">{addr.houseNo}</Typography>
              </Box>
              
              <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <IconButton onClick={() => handleEdit(addr)} sx={{ mr: 1 }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(addr._id)} color="error">
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography align="center" sx={{ my: 3, color: '#666' }}>
            No addresses found. Add your first address below.
          </Typography>
        )}

        {/* Add address button */}
        {!showForm && (
          <Button
            fullWidth
            onClick={() => setShowForm(true)}
            sx={{
              borderRadius: 3,
              py: 2,
              mt: 2,
              bgcolor: COLORS.white,
              color: '#000',
              border: '1px solid #ddd',
              textTransform: 'none',
              fontSize: 16,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            +Add address
          </Button>
        )}

        {/* Add/Edit form */}
        {showForm && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, bgcolor: COLORS.white, p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {editingId ? 'Edit Address' : 'New Address'}
            </Typography>

            <TextField
              fullWidth
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone No"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Alternative Phone"
              name="alternativePhone"
              value={formData.alternativePhone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="House/Floor No"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: COLORS.green, '&:hover': { bgcolor: '#5a6d42' } }}
              >
                {editingId ? 'Update' : 'Save'}
              </Button>
              <Button variant="outlined" fullWidth onClick={resetForm}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default AddAddress;
