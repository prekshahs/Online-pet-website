import React, { useState, useContext } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendRegisterOTP, verifyRegisterOTP } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const steps = ['Enter Details', 'Verify OTP'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
  e.preventDefault();
  try {
    const response = await sendRegisterOTP({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
    setActiveStep(1);
    setError('');
    // Show alert for testing (since Twilio is not configured)
    alert('✅ OTP sent! Check backend console for OTP code (Twilio not configured for testing)');
  } catch (error) {
    setError(error.response?.data?.message || 'Failed to send OTP');
  }
};

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyRegisterOTP({
        email: formData.email,
        phone: formData.phone,
        otp: formData.otp,
        password: formData.password,
      });
      login(data, data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={5} className="form-container">
        <Typography className="form-title">
          🐾 Create account
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {activeStep === 0 ? (
          <form onSubmit={handleSendOTP}>
            <TextField
              fullWidth
              label="NAME"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              className="form-input"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#758956',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#758956',
                },
              }}
            />
            <TextField
              fullWidth
              label="EMAIL"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              className="form-input"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#758956',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#758956',
                },
              }}
            />
            <TextField
              fullWidth
              label="PHONE NUMBER"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
              className="form-input"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#758956',
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
              className="btn-primary-custom"
              sx={{ mt: 3, py: 1.5 }}
            >
              SEND OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <Typography variant="body1" textAlign="center" sx={{ mb: 2, color: '#666' }}>
              Enter the OTP sent to {formData.phone}
            </Typography>

            <TextField
              fullWidth
              label="ENTER THE OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              margin="normal"
              required
              className="form-input"
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#758956',
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
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#758956',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#758956',
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => setActiveStep(0)}
                sx={{ py: 1.5, borderColor: '#758956', color: '#758956' }}
              >
                BACK
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                className="btn-primary-custom"
                sx={{ py: 1.5 }}
              >
                DONE
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
}

export default Register;
