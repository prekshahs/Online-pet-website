import React, { useState, useContext } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  console.log('🔐 Attempting login...');
  console.log('📡 API URL:', `${API_URL}/api/users/login`);
  console.log('📨 Sending:', { emailOrPhone: formData.emailOrPhone });
  
  const res = await axios.post(`${API_URL}/api/users/login`, {
    emailOrPhone: formData.emailOrPhone,
    password: formData.password
  });

  console.log('✅ Full response:', res);
  console.log('✅ Response data:', res.data);
  console.log('✅ Token in response:', res.data.token);

  // CRITICAL: Save token to localStorage
  const token = res.data.token;
  if (token) {
  localStorage.setItem('token', token);           // ← Save separately
  console.log('✅ Token saved to localStorage:', token);
} else {
  console.error('❌ No token in response!');
  throw new Error('No token received from server');
}
  
  // Save user info
  localStorage.setItem('user', JSON.stringify(res.data));
  console.log('✅ User saved');

  // Update AuthContext
  if (login) {
    login(res.data);
  }

  alert('Login successful!');
  navigate('/dashboard');
  
} catch (err) {
  console.error('❌ Login error:', err);
  console.error('❌ Error response:', err.response?.data);
  setError(err.response?.data?.message || 'Login failed. Check your credentials.');
} finally {
  setLoading(false);
}

  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={5} className="form-container">
        <Typography className="form-title">
          🐾 LOGIN
        </Typography>
        
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="EMAIL / PHONE NUMBER"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            margin="normal"
            required
            className="form-input"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#758956',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#758956',
              },
            }}
          />
          <TextField
            fullWidth
            label="PASSWORD"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            className="form-input"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#758956',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#758956',
              },
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={loading}
            className="btn-primary-custom"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <MuiLink component={Link} to="/register" className="form-link">
            Create account
          </MuiLink>
          <br />
          <MuiLink component={Link} to="/forget-password" className="form-link" sx={{ mt: 1, display: 'inline-block' }}>
            Forget password
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
