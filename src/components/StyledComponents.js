import { styled } from '@mui/material';
import { Card, Button, Paper } from '@mui/material';

// Common styled components that can be reused across the application

export const FlexCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const CenteredContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
}));

export const ActionButton = styled(Button)(({ theme, color = 'primary' }) => ({
  marginTop: theme.spacing(2),
  minWidth: 120,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  ...(color === 'gradient' && {
    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
    },
  }),
}));

export const HeaderSection = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2, 0),
}));

export const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)',
  },
}));

export const IconContainer = styled('div')(({ theme, color = theme.palette.primary.main }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: `${color}20`,
  color: color,
  marginRight: theme.spacing(2),
  '& svg': {
    fontSize: 28,
  },
}));

export const MetricValue = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .value': {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  '& .label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
}));
