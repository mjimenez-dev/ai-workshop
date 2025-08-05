import { styled } from '@mui/material/styles';
import { 
  Card, 
  CardContent, 
  Button, 
  Box, 
  Container,
  AppBar,
  Toolbar,
  Grid,
  Chip,
  Typography
} from '@mui/material';

// Layout Components
export const MainContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1200px', // Container max width from guidelines
  paddingLeft: theme.spacing(4), // 16px mobile
  paddingRight: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(6), // 24px tablet
    paddingRight: theme.spacing(6),
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(8), // 32px desktop
    paddingRight: theme.spacing(8),
  },
}));

export const PageSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(16), // 64px section margins
  marginBottom: theme.spacing(16),
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(24), // 96px on desktop
    marginBottom: theme.spacing(24),
  },
}));

// Header/Navigation Components
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // #FFFFFF
  color: theme.palette.text.primary, // #000000
  boxShadow: `0 1px 0 ${theme.palette.grey[300]}`, // Subtle bottom border
  '& .MuiToolbar-root': {
    padding: `0 ${theme.spacing(4)}px`,
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacing(6)}px`,
    },
    [theme.breakpoints.up('lg')]: {
      padding: `0 ${theme.spacing(8)}px`,
    },
  },
}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500, // Medium weight for navigation
  '&:hover': {
    color: theme.palette.primary.main, // #DB4444 on hover
    backgroundColor: 'transparent',
  },
}));

// Product Grid Components
export const ProductGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(6), // 24px spacing
}));

export const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4), // 16px card padding
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: theme.spacing(2), // 8px border radius
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4], // Subtle elevation on hover
    transform: 'translateY(-2px)',
    borderColor: theme.palette.grey[300],
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8), // 32px on larger screens
  },
}));

export const ProductImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1', // Square aspect ratio
  backgroundColor: theme.palette.grey[200], // #F5F5F5 background
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const ProductContent = styled(CardContent)(() => ({
  padding: 0,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '&:last-child': {
    paddingBottom: 0,
  },
}));

// Pricing Components
export const PriceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const PrimaryPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main, // #DB4444 for prices
  fontWeight: 700, // Bold
  fontSize: '1.25rem', // 20px
}));

export const OriginalPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary, // 60% opacity
  textDecoration: 'line-through',
  fontSize: '1rem',
}));

// Button Components
export const PrimaryActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // #DB4444
  color: theme.palette.primary.contrastText, // #FFFFFF
  padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`, // 8px 12px
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, // #000000 on hover
    color: theme.palette.primary.contrastText,
  },
}));

export const SecondaryActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.text.primary, // #000000
  border: `1px solid ${theme.palette.grey[300]}`, // #D9D9D9 border
  padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

// Category Sidebar Components
export const CategorySidebar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.grey[300]}`,
  height: 'fit-content',
  position: 'sticky',
  top: theme.spacing(2),
}));

export const CategoryButton = styled(Button)(({ theme, active }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  marginBottom: theme.spacing(1),
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
    color: active ? theme.palette.primary.contrastText : theme.palette.primary.main,
  },
}));

// Badge and Status Components
export const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main, // #DB4444
  color: theme.palette.primary.contrastText, // #FFFFFF
  fontWeight: 600,
  fontSize: '0.75rem',
}));

export const StockStatus = styled(Chip)(({ theme, inStock }) => ({
  backgroundColor: inStock ? theme.palette.success.main : theme.palette.error.main,
  color: '#FFFFFF',
  fontWeight: 500,
  fontSize: '0.75rem',
}));

// Rating Components
export const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

// Utility Components
export const FlexCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const FlexBetween = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FlexColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

// Search Components
export const SearchContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 400,
  margin: `0 ${theme.spacing(4)}px`,
  [theme.breakpoints.down('md')]: {
    maxWidth: 200,
    margin: `0 ${theme.spacing(2)}px`,
  },
}));

// Legacy components for compatibility
export const FlexCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(0.5),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.2s ease-in-out',
}));
