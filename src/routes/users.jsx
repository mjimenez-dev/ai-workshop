import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  AppBar,
  Toolbar,
  styled,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import usersData from '../data/users.json';

// Styled Components
const UserCard = styled(Card)(() => ({
  height: '100%',
}));

const UserHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
}));

const UserInfo = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const RoleText = styled(Typography)(() => ({
  marginBottom: '8px',
}));

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    setUsers(usersData);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<ArrowBack />}
            sx={{ mr: 2 }}
          >
            Back to Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Team Members
        </Typography>
        
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <UserCard>
                <CardContent>
                  <UserHeader>
                    <UserAvatar
                      src={user.avatar}
                      alt={user.name}
                    />
                    <UserInfo>
                      <Typography variant="h6" component="h2">
                        {user.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {user.email}
                      </Typography>
                    </UserInfo>
                  </UserHeader>
                  
                  <RoleText variant="body1" gutterBottom>
                    <strong>Role:</strong> {user.role}
                  </RoleText>
                  
                  <Chip 
                    label={user.department} 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                  />
                </CardContent>
              </UserCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const Route = createFileRoute('/users')({
  component: UsersComponent,
});
