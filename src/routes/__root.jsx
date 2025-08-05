import { createRootRoute, Outlet } from '@tanstack/react-router';
import React from 'react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  TextField, 
  IconButton, 
  Box 
} from '@mui/material';
import { 
  ShoppingCart, 
  Search as SearchIcon 
} from '@mui/icons-material';
import { 
  StyledAppBar, 
  SearchContainer, 
  FlexBetween,
  NavButton 
} from '../components/StyledComponents';

const RootComponent = () => {
  return (
    <>
      {/* E-commerce Navigation Header */}
      <StyledAppBar position="sticky">
        <Toolbar>
          <FlexBetween sx={{ width: '100%' }}>
            {/* Logo with Enhanced Styling */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 32, 
                height: 32, 
                backgroundColor: 'primary.main', 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                T
              </Box>
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'text.primary',
                  letterSpacing: -0.5 
                }}
              >
                TechStore
              </Typography>
            </Box>
            
            {/* Search Bar */}
            <SearchContainer>
              <TextField
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  sx: {
                    backgroundColor: 'grey.100',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid',
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </SearchContainer>
            
            {/* Enhanced Cart Icon with Badge */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <IconButton 
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(219, 68, 68, 0.04)',
                    }
                  }}
                >
                  <ShoppingCart />
                </IconButton>
                {/* Cart Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                >
                  3
                </Box>
              </Box>
            </Box>
          </FlexBetween>
        </Toolbar>
      </StyledAppBar>
      
      {/* Main Content */}
      <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Box>
      
      {/* Router Devtools */}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
