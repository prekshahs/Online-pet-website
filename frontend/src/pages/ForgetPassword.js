import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendForgetPasswordOTP, verifyForgetPasswordOTP } from '../services/api';

function ForgetPassword() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    otp: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const steps = ['Enter Email/Phone', 'Verify OTP'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await sendForgetPasswordOTP({ emailOrPhone: formData.emailOrPhone });
      setActiveStep(1);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      await verifyForgetPasswordOTP({
        emailOrPhone: formData.emailOrPhone,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      alert('Password reset successful!');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={5} className="form-container">
        <Typography className="form-title">
          🔐 FORGET PASSWORD
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
              label="EMAIL / PHONE NUMBER"
              name="emailOrPhone"
              value={formData.emailOrPhone}
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
              Enter the OTP sent to {formData.emailOrPhone}
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
              label="NEW PASSWORD"
              name="newPassword"
              type="password"
              value={formData.newPassword}
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

export default ForgetPassword;
