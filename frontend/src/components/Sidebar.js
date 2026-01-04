import React, { useContext } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  Home,
  Pets,
  Restaurant,
  Toys,
  Hotel,
  Person,
  Info,
  LocalHospital,
  Favorite,
  HelpCenter,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Sidebar({ open, onClose }) {
  const { user } = useContext(AuthContext);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, bgcolor: '#758956', color: 'white', height: '100%' }}>
        {/* Sidebar Header */}
        <Box sx={{ p: 3, bgcolor: '#5a6d42' }}>
          <Typography variant="h5" fontWeight="bold">
            🐾 SMILEY
          </Typography>
          <Typography variant="body2">Pet Store Menu</Typography>
        </Box>

        <List>
          {/* Home */}
          <ListItem
            component={Link}
            to="/"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="HOME" />
          </ListItem>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

          {/* Categories */}
          <ListItem
            component={Link}
            to="/products/PETS"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Pets />
            </ListItemIcon>
            <ListItemText primary="PETS" />
          </ListItem>

          <ListItem
            component={Link}
            to="/products/PEET FOODS"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Restaurant />
            </ListItemIcon>
            <ListItemText primary="PEET FOODS" />
          </ListItem>

          <ListItem
            component={Link}
            to="/products/TOYS"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Toys />
            </ListItemIcon>
            <ListItemText primary="TOYS" />
          </ListItem>

          <ListItem
            component={Link}
            to="/products/PEETS BED"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Hotel />
            </ListItemIcon>
            <ListItemText primary="PEETS BED" />
          </ListItem>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />

          {/* User Section (only if logged in) */}
          {user && (
            <>
              <ListItem
                component={Link}
                to="/account"
                onClick={onClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="ACCOUNT" />
              </ListItem>

              <ListItem
                component={Link}
                to="/pet-info"
                onClick={onClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="YOUR PET INFO" />
              </ListItem>

              <ListItem
                component={Link}
                to="/animal-info"
                onClick={onClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Pets />
                </ListItemIcon>
                <ListItemText primary="ANIMAL INFO" />
              </ListItem>

              <ListItem
                component={Link}
                to="/hospital"
                onClick={onClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText primary="PETS HOSPITAL" />
              </ListItem>

              <ListItem
                component={Link}
                to="/wishlist"
                onClick={onClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="WISHLIST" />
              </ListItem>

              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
            </>
          )}

          {/* Help Center */}
          <ListItem
            component={Link}
            to="/help"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <HelpCenter />
            </ListItemIcon>
            <ListItemText primary="HELP CENTER" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
