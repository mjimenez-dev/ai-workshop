import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, styled } from '@mui/material';
import { Dashboard, People, Assignment } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

// Styled Components
const HeroSection = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const IconWrapper = styled('div')(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardContent = styled(CardContent)(() => ({
  flexGrow: 1,
  textAlign: 'center',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const IndexComponent = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to AI Workshop
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A modern React application built with Vite, MUI, and TanStack Router
        </Typography>
      </HeroSection>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <StyledCardContent>
              <IconWrapper>
                <Dashboard />
              </IconWrapper>
              <Typography variant="h5" component="h2" gutterBottom>
                Dashboard
              </Typography>
              <Typography color="text.secondary" paragraph>
                View application metrics and overview
              </Typography>
              <ActionButton 
                component={Link} 
                to="/dashboard" 
                variant="contained"
              >
                Go to Dashboard
              </ActionButton>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <StyledCardContent>
              <IconWrapper>
                <People />
              </IconWrapper>
              <Typography variant="h5" component="h2" gutterBottom>
                Users
              </Typography>
              <Typography color="text.secondary" paragraph>
                Manage users and their profiles
              </Typography>
              <ActionButton 
                component={Link} 
                to="/users" 
                variant="contained"
              >
                View Users
              </ActionButton>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <StyledCardContent>
              <IconWrapper>
                <Assignment />
              </IconWrapper>
              <Typography variant="h5" component="h2" gutterBottom>
                Projects
              </Typography>
              <Typography color="text.secondary" paragraph>
                Track and manage project tasks
              </Typography>
              <ActionButton 
                component={Link} 
                to="/projects" 
                variant="contained"
              >
                View Projects
              </ActionButton>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export const Route = createFileRoute('/')({
  component: IndexComponent,
});
