import { createRootRoute, Outlet } from '@tanstack/react-router';
import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

const RootComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
