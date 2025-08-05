import { createTheme } from '@mui/material/styles';

// Design system based on ai-docs/design_guidelines.md
const theme = createTheme({
  palette: {
    // Primary brand color
    primary: {
      main: '#DB4444', // Brand Red for CTAs, discounts, active states
      contrastText: '#FFFFFF',
    },
    // Secondary neutral colors
    secondary: {
      main: '#000000', // Pure Black for text and navigation
      contrastText: '#FFFFFF',
    },
    // Background colors
    background: {
      default: '#FFFFFF', // Pure White main background
      paper: '#F5F5F5', // Light Gray for cards and input fields
    },
    // Text colors
    text: {
      primary: '#000000', // Primary text (100% opacity)
      secondary: 'rgba(0, 0, 0, 0.6)', // Secondary text (60% opacity)
      disabled: 'rgba(0, 0, 0, 0.3)', // Disabled text (30% opacity)
    },
    // Semantic colors
    success: {
      main: '#00FF66', // Success Green for stock status
    },
    warning: {
      main: '#FFAD33', // Warning Orange for star ratings
    },
    error: {
      main: '#DB4444', // Use brand red for errors
    },
    // Custom colors for design system
    grey: {
      100: '#FAFAFA', // Off-White for subtle backgrounds
      200: '#F5F5F5', // Light Gray for product image backgrounds
      300: '#D9D9D9', // Medium Gray for borders and dividers
      900: '#000000', // Pure Black
    },
  },
  
  // Typography system from design guidelines
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segui UI"',
      'Roboto',
      'sans-serif'
    ].join(','),
    
    // Font scales (px to rem conversion)
    h1: {
      fontSize: '2rem', // 32px - Main page titles
      fontWeight: 700, // Bold
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem', // 24px - Section headers
      fontWeight: 600, // Semibold
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem', // 20px - Product titles
      fontWeight: 600, // Semibold
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1rem', // 16px - Secondary headings
      fontWeight: 500, // Medium
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem', // 16px - Primary body text
      fontWeight: 400, // Regular
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem', // 14px - Secondary text, labels
      fontWeight: 400, // Regular
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.75rem', // 12px - Captions, metadata
      fontWeight: 400, // Regular
      lineHeight: 1.3,
    },
    button: {
      fontSize: '1rem', // 16px - Button text
      fontWeight: 500, // Medium
      textTransform: 'none', // Prevent uppercase transformation
    },
  },
  
  // Spacing system - 4px base unit
  spacing: 4, // Base unit of 4px
  
  // Custom breakpoints matching design guidelines
  breakpoints: {
    values: {
      xs: 0,
      sm: 320, // Mobile start
      md: 768, // Tablet start
      lg: 1024, // Desktop start
      xl: 1200, // Container max width
    },
  },
  
  // Component overrides for consistent styling
  components: {
    // Button overrides for brand consistency
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Consistent border radius
          padding: '8px 12px', // Button padding from guidelines
          textTransform: 'none', // Prevent uppercase
          fontWeight: 500, // Medium weight
        },
        contained: {
          boxShadow: 'none', // Clean flat design
          '&:hover': {
            boxShadow: 'none',
            opacity: 0.9, // 90% opacity on hover per guidelines
          },
        },
      },
    },
    
    // Card overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded corners
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)', // Hover elevation
          },
        },
      },
    },
    
    // Input field overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#DB4444', // Brand color on hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#DB4444', // Brand color on focus
              borderWidth: '2px', // 2px outline per guidelines
            },
          },
        },
      },
    },
  },
});

export default theme;
