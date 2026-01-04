import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  green: '#758956',
  peach: '#e5a177',
  cream: '#e9d3a2'
};

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: COLORS.cream,
        display: 'flex',
        alignItems: 'LEFT',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Main content box */}
      <Box
        sx={{
          zIndex: 0,
          maxWidth: 500,
          padding: { xs: 3, md: 6 },
          marginLeft: { xs: 1, md: 10 },
          borderRadius: 4,
          background: 'rgba(233, 211, 162, 0.95)'
        }}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Poppins, Arial, sans-serif',
            color: '#2c2315',
            fontWeight: 500,
            mb: 1
          }}
        >
          HI WELCOME TO SMILEY
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: '#2c2315', fontWeight: 400, fontSize: 17, mb: 4 }}
        >
          YOU AND CUTE PARTNER WILL HAVE FUN BY SHOPPING HERE, I HOPE.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{
              background: COLORS.green,
              color: '#222',
              borderRadius: 8,
              px: 4,
              py: 1.2,
              fontWeight: 500,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: COLORS.peach,
                color: '#fff'
              }
            }}
            onClick={() => navigate('/login')}
          >
            LOGIN / REGISTER
          </Button>
        </Box>
      </Box>

      {/* Hero Pets Image (absolute) */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 0, md: 40 },
          bottom: { xs: 0, md: 0 },
          zIndex: 1,
          width: { xs: '60vw', md: 430 },
          height: { xs: '60vw', md: 430 },
          borderTopLeftRadius: '50% 60%',
          overflow: 'hidden',
          background: `url('${process.env.PUBLIC_URL}/hero-pets.jpg') center/cover no-repeat`,
          boxShadow: '0 8px 54px 0px rgba(70,70,50,0.22)',
        }}
      />
    </Box>
  );
}

export default Home;
