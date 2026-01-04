import React from 'react';
import { Box, Typography, Button, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ... inside component


const COLORS = {
  green: '#758956',
  peach: '#e5a177',
  cream: '#e9d3a2'
};

function AccountInfo() {
  // Optional: Use theme's spacing
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '300vh',
        background: COLORS.cream,
        py: 8
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 500, letterSpacing: 1, color: '#222', mb: 6 }}
      >
        ACCOUNT INFO
      </Typography>

      {/* Main Grid (If business account is required, show second grid below) */}
      <Grid
        container
        spacing={5}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 1200, mx: 'auto' }}
      >
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              background: COLORS.green,
              borderRadius: 6,
              py: 3,
              px: 5,
              mx: 'auto',
              width: '100%',
              mb: 2,
              transition: 'box-shadow 0.3s',
              textAlign: 'center',
              '&:hover': { boxShadow: 4 },
              cursor: 'pointer'
            }}
            onClick={() => navigate("/customer-info")}
          >
            <Typography
              variant="h5"
              sx={{ color: COLORS.peach, fontWeight: 400, letterSpacing: 1 }}
            >
              Customer info
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              background: COLORS.green,
              borderRadius: 6,
              py: 3,
              px: 5,
              mx: 'auto',
              width: '100%',
              mb: 2,
              textAlign: 'center',
              transition: 'box-shadow 0.3s',
              '&:hover': { boxShadow: 4 },
              cursor: 'pointer'
            }}onClick={() => navigate('/add-address')}
          >
            <Typography
              variant="h5"
              sx={{ color: COLORS.peach, fontWeight: 400 }}
            >
              Add Address
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              background: COLORS.green,
              borderRadius: 6,
              py: 3,
              px: 5,
              mx: 'auto',
              width: '100%',
              mb: 2,
              textAlign: 'center',
              transition: 'box-shadow 0.3s',
              '&:hover': { boxShadow: 4 },
              cursor: 'pointer'
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: COLORS.peach, fontWeight: 400 }}
            >
              Order
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              background: COLORS.green,
              borderRadius: 6,
              py: 3,
              px: 5,
              mx: 'auto',
              width: '100%',
              mb: 2,
              textAlign: 'center',
              transition: 'box-shadow 0.3s',
              '&:hover': { boxShadow: 4 },
              cursor: 'pointer'
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: COLORS.peach, fontWeight: 400 }}
            >
              Payment options
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Divider space */}
      <Box sx={{ height: 55 }} />

      {/* Business Account Section */}
      <Grid container justifyContent="center" sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              background: COLORS.green,
              borderRadius: 6,
              py: 3,
              px: 5,
              mx: 'auto',
              width: '100%',
              mb: 2,
              textAlign: 'center',
              transition: 'box-shadow 0.3s',
              '&:hover': { boxShadow: 4 },
              cursor: 'pointer'
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: COLORS.peach, fontWeight: 400 }}
            >
              Your Bussiness account
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountInfo;
