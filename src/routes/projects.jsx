import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  styled,
} from '@mui/material';
import { ArrowBack, AccessTime, Person } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import projectsData from '../data/projects.json';
import usersData from '../data/users.json';

// Styled Components
const ProjectCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ProjectCardContent = styled(CardContent)(() => ({
  flexGrow: 1,
}));

const ProjectHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const ProjectMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const MetaIcon = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1),
  fontSize: 18,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  marginRight: theme.spacing(1),
}));

const TagsContainer = styled('div')(({ theme }) => ({
  '& > *': {
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    setProjects(projectsData);
    setUsers(usersData);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'todo':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

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
            Projects Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Project Tasks
        </Typography>
        
        <Grid container spacing={3}>
          {projects.map((project) => {
            const assignedUser = getUserById(project.assignedTo);
            
            return (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <ProjectCard>
                  <ProjectCardContent>
                    <ProjectHeader>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {project.title}
                      </Typography>
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </ProjectHeader>
                    
                    <Typography color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    
                    <div style={{ marginBottom: 16 }}>
                      <Chip
                        label={`${project.priority} priority`}
                        color={getPriorityColor(project.priority)}
                        size="small"
                        variant="outlined"
                      />
                    </div>
                    
                    {assignedUser && (
                      <ProjectMeta>
                        <MetaIcon>
                          <Person />
                        </MetaIcon>
                        <UserAvatar
                          src={assignedUser.avatar}
                          alt={assignedUser.name}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {assignedUser.name}
                        </Typography>
                      </ProjectMeta>
                    )}
                    
                    <ProjectMeta>
                      <MetaIcon>
                        <AccessTime />
                      </MetaIcon>
                      <Typography variant="body2" color="text.secondary">
                        Due: {formatDate(project.dueDate)}
                      </Typography>
                    </ProjectMeta>
                    
                    <TagsContainer>
                      {project.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </TagsContainer>
                  </ProjectCardContent>
                </ProjectCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export const Route = createFileRoute('/projects')({
  component: ProjectsComponent,
});
