import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../utils/auth';


const COLORS = {
  green: '#758956',
  peach: '#e5a177',
  cream: '#e9d3a2'
};

function CustomerInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    address: '',
    state: '',
    district: '',
    house: '',
    phoneNo: '',
    altPhoneNo: '',
    otp: '',
    profilePicUrl: ''
  });
  const [profilePreview, setProfilePreview] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Only run when actually on this page
    if (location.pathname !== '/customer-info') {
      return;
    }

    const fetchProfile = async () => {
      try {
        // Multiple attempts to get token (handles React Strict Mode)
       const token = getToken();
        
        console.log('🔍 Checking token in CustomerInfo...');
        console.log('Token exists:', token ? 'YES' : 'NO');
        
        if (!token) {
          console.log('❌ No token found after retries');
          setCheckingAuth(false);
          setTimeout(() => {
            alert('Please log in to access customer info');
            navigate('/login');
          }, 500);
          return;
        }

        console.log('✅ Token found:', token.substring(0, 20) + '...');
        setCheckingAuth(false);

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        
        console.log('📡 Fetching customer info...');
        const res = await axios.get(`${API_URL}/api/users/customer-info`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('✅ Customer info fetched successfully');

        if (res.data) {
          setInfo(prev => ({ ...prev, ...res.data }));
        }
        if (res.data?.profilePicUrl) {
          setProfilePreview(res.data.profilePicUrl);
        }
      } catch (error) {
        console.error('❌ Error:', error);
        setCheckingAuth(false);
        
        if (error.response?.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    };
    
    fetchProfile();
  }, [navigate, location.pathname]);

  const onSelectFile = e => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
      setInfo(prev => ({ ...prev, profilePicUrl: previewUrl }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert('Please log in first');
        navigate('/login');
        return;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

      await axios.post(`${API_URL}/api/users/customer-info`, info, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Customer info saved successfully!');
      navigate('/account');
    } catch (error) {
      console.error('Error saving customer info:', error);
      alert('Failed to save customer info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <Box sx={{ minHeight: '100vh', background: COLORS.cream, py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Checking authentication...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: COLORS.cream, px: 1, py: 4 }}>
      <Typography align="center" sx={{ mb: 3, fontSize: 26, fontWeight: 500, color: '#1a1a1a' }}>
        CUSTOMER INFO
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Box component="form" onSubmit={step === 1 ? handleContinue : handleSubmit} sx={{ mx: 2, maxWidth: 700 }}>
            {step === 1 && (
              <>
                <TextField label="FNAME" name="fname" value={info.fname} onChange={handleChange} variant="filled" fullWidth required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <TextField label="LNAME" name="lname" value={info.lname} onChange={handleChange} variant="filled" fullWidth required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <TextField label="EMAIL-ID" name="email" value={info.email} onChange={handleChange} variant="filled" fullWidth type="email" required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <TextField label="ADDRESS" name="address" value={info.address} onChange={handleChange} variant="filled" fullWidth required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="STATE" name="state" value={info.state} onChange={handleChange} variant="filled" fullWidth required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="DISTRICT" name="district" value={info.district} onChange={handleChange} variant="filled" fullWidth required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                  </Grid>
                </Grid>
                <Button variant="contained" type="submit" sx={{ bgcolor: COLORS.green, color: COLORS.peach, py: 1.5, px: 4, borderRadius: 4, '&:hover': { bgcolor: '#5a6d42' } }}>
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <TextField label="PHONE NO." name="phoneNo" value={info.phoneNo} onChange={handleChange} variant="filled" fullWidth required sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <TextField label="ALTERNATIVE PHNO." name="altPhoneNo" value={info.altPhoneNo} onChange={handleChange} variant="filled" fullWidth sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <TextField label="HOUSE NAME/OFFICE NAME OR FLOOR NO." name="house" value={info.house} onChange={handleChange} variant="filled" fullWidth sx={{ bgcolor: '#f8f6ec', mb: 2, borderRadius: 3 }} />
                <TextField label="OTP" name="otp" value={info.otp} onChange={handleChange} variant="filled" fullWidth sx={{ bgcolor: '#f8f6ec', mb: 3, borderRadius: 3 }} />
                <Box textAlign="center" sx={{ my: 2 }}>
                  <Button variant="contained" type="submit" disabled={loading} sx={{ bgcolor: COLORS.green, color: COLORS.cream, width: 320, borderRadius: 4, py: 1.1, fontSize: 18, '&:hover': { bgcolor: '#5a6d42' } }}>
                    {loading ? 'Saving...' : 'SAVE INFO & SEND OTP'}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Box sx={{ mt: 2 }}>
            <Avatar src={profilePreview} alt="Profile" sx={{ width: 170, height: 170, bgcolor: "#eeeeee", mx: 'auto' }} />
            <input type="file" accept="image/*" onChange={onSelectFile} style={{ display: 'block', marginTop: 16 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomerInfo;
