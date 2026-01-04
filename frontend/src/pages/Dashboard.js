import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const COLORS = {
  green: '#758956',
  peach: '#e5a177',
  cream: '#e9d3a2',
  dark: '#393734',
  white: '#fff'
};

function Dashboard() {
  return (
    <Box sx={{
      background: COLORS.cream,
      minHeight: '100vh',
      pb: 5
    }}>
      {/* Navigation bar already provided by your Navbar component */}

      {/* Banner/Graphics Section */}
      <Box
        sx={{
          background: COLORS.green,
          borderRadius: '30px',
          margin: { xs: 2, md: 4 },
          py: 4,
          px: { xs: 2, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          position: "relative"
        }}
      >
        {/* Graphics row */}
        <Box sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}>
          {/* Left animal drawings */}
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
            <Box>
              <img src={'dog.png'} alt="dog" style={{ height: 100 }} />
              <Typography variant="caption" sx={{
                background: COLORS.cream,
                px: 1,
                borderRadius: 2,
                fontWeight: 500
              }}>What's up?</Typography>
            </Box>
            <Box>
              <img src={'/cat.png'} alt="cat" style={{ height: 80 }} />
              <Typography variant="caption" sx={{
                background: COLORS.cream,
                px: 1,
                borderRadius: 2,
                fontWeight: 500
              }}>SHUT UP!!</Typography>
            </Box>
            <img src={'/fish.png'} alt="fishbowl" style={{ height: 70 }} />
          </Box>
          
          {/* Middle section: Button */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1
          }}>
            <Button
              variant="contained"
              sx={{
                background: COLORS.dark,
                color: COLORS.peach,
                px: 5,
                py: 2,
                borderRadius: 5,
                fontSize: 20,
                fontWeight: 400,
                boxShadow: "none",
                mb: 2,
                '&:hover': {
                  background: COLORS.peach,
                  color: COLORS.dark
                }
              }}
            >
              Come On Lets<br />The Real Pic
            </Button>
          </Box>

          {/* Right animal drawings */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-end" }}>
            <Typography variant="caption" sx={{ mb: -2, ml: 7, color: COLORS.white, fontWeight: 500 }}>
              Hot Tea...
            </Typography>
            <img src={'/bird.png'} alt="bird" style={{ height: 60, marginBottom: 10 }} />
            <Typography variant="caption" sx={{ mt: -2, color: COLORS.white, fontWeight: 500 }}>
              Hmmmm
            </Typography>
            <img src={'/fish.png'} alt="tortoise" style={{ height: 40 }} />
          </Box>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Container>
        <Typography variant="h5" fontWeight={600} sx={{ mt: 3, mb: 2 }}>
          BED FOR PET:
        </Typography>

        {/* Product/Beds Grid */}
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((_, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Box
                sx={{
                  background: idx % 2 === 0 ? '#e9d3a2' : COLORS.green,
                  p: 2,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                {/* Use placeholder or existing images */}
                <img
                  src={`/hero-pets.jpg`} // Using existing hero image as placeholder
                  alt="Bed for pet"
                  style={{
                    height: 180,
                    borderRadius: 10,
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
