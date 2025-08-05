import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Paper,
  LinearProgress,
  styled,
} from '@mui/material';
import { ArrowBack, People, Assignment, TrendingUp, CheckCircle } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import projectsData from '../data/projects.json';
import usersData from '../data/users.json';

// Styled Components
const MetricCard = styled(Card)(() => ({
  height: '100%',
}));

const MetricContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const MetricIcon = styled('div')(({ theme }) => ({
  fontSize: 40,
  marginRight: theme.spacing(2),
}));

const MetricText = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ChartPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ProgressSection = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ProgressHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const StyledLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
}));

const ActionsSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const ButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

const DashboardComponent = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setProjects(projectsData);
    setUsers(usersData);
  }, []);

  const getProjectStats = () => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const inProgress = projects.filter(p => p.status === 'in-progress').length;
    const todo = projects.filter(p => p.status === 'todo').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, inProgress, todo, completionRate };
  };

  const getDepartmentStats = () => {
    const departments = {};
    users.forEach(user => {
      departments[user.department] = (departments[user.department] || 0) + 1;
    });
    return departments;
  };

  const stats = getProjectStats();
  const departments = getDepartmentStats();

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
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Overview
        </Typography>
        
        {/* Key Metrics */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <CardContent>
                <MetricContent>
                  <MetricIcon style={{ color: '#1976d2' }}>
                    <People />
                  </MetricIcon>
                  <MetricText>
                    <Typography variant="h4">{users.length}</Typography>
                    <Typography color="text.secondary">Total Users</Typography>
                  </MetricText>
                </MetricContent>
              </CardContent>
            </MetricCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <CardContent>
                <MetricContent>
                  <MetricIcon style={{ color: '#ed6c02' }}>
                    <Assignment />
                  </MetricIcon>
                  <MetricText>
                    <Typography variant="h4">{stats.total}</Typography>
                    <Typography color="text.secondary">Total Projects</Typography>
                  </MetricText>
                </MetricContent>
              </CardContent>
            </MetricCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <CardContent>
                <MetricContent>
                  <MetricIcon style={{ color: '#2e7d32' }}>
                    <CheckCircle />
                  </MetricIcon>
                  <MetricText>
                    <Typography variant="h4">{stats.completed}</Typography>
                    <Typography color="text.secondary">Completed</Typography>
                  </MetricText>
                </MetricContent>
              </CardContent>
            </MetricCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard>
              <CardContent>
                <MetricContent>
                  <MetricIcon style={{ color: '#0288d1' }}>
                    <TrendingUp />
                  </MetricIcon>
                  <MetricText>
                    <Typography variant="h4">{Math.round(stats.completionRate)}%</Typography>
                    <Typography color="text.secondary">Completion Rate</Typography>
                  </MetricText>
                </MetricContent>
              </CardContent>
            </MetricCard>
          </Grid>
        </Grid>

        {/* Project Status Overview */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChartPaper>
              <Typography variant="h6" gutterBottom>
                Project Status Distribution
              </Typography>
              
              <ProgressSection>
                <ProgressHeader>
                  <Typography variant="body2">Completed ({stats.completed})</Typography>
                  <Typography variant="body2">{Math.round((stats.completed / stats.total) * 100)}%</Typography>
                </ProgressHeader>
                <StyledLinearProgress 
                  variant="determinate" 
                  value={(stats.completed / stats.total) * 100} 
                  color="success"
                />
              </ProgressSection>

              <ProgressSection>
                <ProgressHeader>
                  <Typography variant="body2">In Progress ({stats.inProgress})</Typography>
                  <Typography variant="body2">{Math.round((stats.inProgress / stats.total) * 100)}%</Typography>
                </ProgressHeader>
                <StyledLinearProgress 
                  variant="determinate" 
                  value={(stats.inProgress / stats.total) * 100} 
                  color="warning"
                />
              </ProgressSection>

              <ProgressSection>
                <ProgressHeader>
                  <Typography variant="body2">To Do ({stats.todo})</Typography>
                  <Typography variant="body2">{Math.round((stats.todo / stats.total) * 100)}%</Typography>
                </ProgressHeader>
                <StyledLinearProgress 
                  variant="determinate" 
                  value={(stats.todo / stats.total) * 100} 
                  color="info"
                />
              </ProgressSection>
            </ChartPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartPaper>
              <Typography variant="h6" gutterBottom>
                Team Distribution by Department
              </Typography>
              
              {Object.entries(departments).map(([dept, count]) => (
                <ProgressSection key={dept}>
                  <ProgressHeader>
                    <Typography variant="body2">{dept} ({count})</Typography>
                    <Typography variant="body2">{Math.round((count / users.length) * 100)}%</Typography>
                  </ProgressHeader>
                  <StyledLinearProgress 
                    variant="determinate" 
                    value={(count / users.length) * 100} 
                    color="primary"
                  />
                </ProgressSection>
              ))}
            </ChartPaper>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <ActionsSection>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <ButtonGroup>
            <Button 
              component={Link} 
              to="/users" 
              variant="contained"
              startIcon={<People />}
            >
              Manage Users
            </Button>
            <Button 
              component={Link} 
              to="/projects" 
              variant="outlined"
              startIcon={<Assignment />}
            >
              View Projects
            </Button>
          </ButtonGroup>
        </ActionsSection>
      </Container>
    </>
  );
};

export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
});
