import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Search as SearchIcon,
  Pets,
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Sidebar from './Sidebar';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#758956', boxShadow: 'none' }}>
        <Toolbar>
          {/* Menu Icon for Sidebar */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Pets sx={{ mr: 1, fontSize: '2rem' }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="navbar-brand"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            SMILEY Pet Store
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button className="nav-button" component={Link} to="/">
              HOME
            </Button>
            <Button className="nav-button" component={Link} to="/products/PETS">
              PETS
            </Button>
            <Button className="nav-button" component={Link} to="/products/PEET FOODS">
              PEET FOODS
            </Button>
            <Button className="nav-button" component={Link} to="/products/TOYS">
              TOYS
            </Button>
            <Button className="nav-button" component={Link} to="/products/PEETS BED">
              PEETS BED
            </Button>
          </Box>

          {/* Search Bar */}
          {user && (
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '2px 15px',
                ml: 2,
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ color: 'white', width: '150px' }}
              />
              <IconButton type="submit" sx={{ color: 'white', p: 0 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}

          {/* Cart Icon */}
          <IconButton color="inherit" component={Link} to="/cart" sx={{ ml: 2 }}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* User Account */}
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Person />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/account');
                  }}
                >
                  Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/orders');
                  }}
                >
                  My Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              className="nav-button"
              onClick={() => navigate('/login')}
              sx={{ ml: 1 }}
            >
              LOGIN/REGISTER
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

export default Navbar;
