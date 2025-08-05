import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useMemo, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  CircularProgress,
  Alert,
  Fade,
  Zoom,
  Chip,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import { 
  MainContainer,
  PageSection,
  CategorySidebar,
  CategoryButton,
  ProductGrid,
  ProductCard,
  ProductImageContainer,
  ProductContent,
  PriceContainer,
  PrimaryPrice,
  OriginalPrice,
  PrimaryActionButton,
  StockStatus,
  RatingContainer
} from '../components/StyledComponents';
import { Star, TrendingUp } from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { Link } from '@tanstack/react-router';
import { ProductGridSkeleton, CategorySidebarSkeleton } from '../components/SkeletonLoaders.jsx';

const HomeComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { 
    products, 
    categories, 
    loading, 
    error, 
    getProductsByCategory,
    getCategoryName,
    retry,
    retryCount
  } = useProducts();

  // Optimized category selection with smooth transitions
  const handleCategoryChange = useCallback((categoryId) => {
    if (categoryId === selectedCategory) return;
    
    setIsTransitioning(true);
    setSelectedCategory(categoryId);
    
    // Quick transition for smooth UX
    setTimeout(() => setIsTransitioning(false), 150);
  }, [selectedCategory]);

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory, getProductsByCategory]);

  // Memoized category data with product counts
  const categoryData = useMemo(() => {
    return categories.map(category => ({
      ...category,
      productCount: getProductsByCategory(category.id).length
    }));
  }, [categories, getProductsByCategory]);

  if (loading) {
    return (
      <MainContainer maxWidth="xl">
        {/* Hero Section */}
        <PageSection>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Explore Our Products
            </Typography>
            <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 400 }}>
              Discover the latest tech products with unbeatable prices
            </Typography>
          </Box>
        </PageSection>

        {/* Loading Content Grid */}
        <Grid container spacing={3}>
          {/* Category Sidebar Skeleton */}
          <Grid item xs={12} md={3}>
            <CategorySidebarSkeleton />
          </Grid>

          {/* Product Grid Skeleton */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              <CircularProgress size={20} sx={{ mr: 2 }} />
              <Typography variant="h2" component="span">
                Loading products...
              </Typography>
            </Box>
            <ProductGridSkeleton count={6} />
          </Grid>
        </Grid>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer sx={{ py: 8 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={retry}
              disabled={retryCount > 0}
            >
              {retryCount > 0 ? `Retrying... (${retryCount}/3)` : 'Retry'}
            </Button>
          }
        >
          {error}
        </Alert>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Unable to load products
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please check your internet connection and try again.
          </Typography>
          <PrimaryActionButton 
            onClick={retry}
            disabled={retryCount > 0}
            startIcon={retryCount > 0 ? <CircularProgress size={16} /> : null}
          >
            {retryCount > 0 ? 'Retrying...' : 'Try Again'}
          </PrimaryActionButton>
        </Box>
      </MainContainer>
    );
  }

  return (
    <MainContainer maxWidth="xl">
      {/* Enhanced Hero Section - Typical Figma E-commerce Pattern */}
      <PageSection>
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #DB444410 0%, #00FF6610 100%)',
            borderRadius: 3,
            p: 6,
            mb: 6,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23DB444408" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.3,
              zIndex: 0,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ 
              background: 'linear-gradient(45deg, #DB4444, #000)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2 
            }}>
              Explore Our Products
            </Typography>
            <Typography variant="h4" color="text.secondary" sx={{ 
              fontWeight: 400,
              mb: 4,
              maxWidth: '600px',
              mx: 'auto' 
            }}>
              Discover the latest tech products with unbeatable prices
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap',
              '& .MuiChip-root': {
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }
            }}>
              <Chip label="✨ New Arrivals" />
              <Chip label="🔥 Hot Deals" />
              <Chip label="📱 Latest Tech" />
            </Box>
          </Box>
        </Box>
      </PageSection>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Category Sidebar */}
        <Grid item xs={12} md={3}>
          <CategorySidebar sx={{
            // Enhanced styling for better Figma match
            background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)',
            borderRadius: 2,
            p: 3,
            // Mobile-first responsive design
            [theme => theme.breakpoints.down('md')]: {
              borderRight: 'none',
              borderBottom: `1px solid ${theme => theme.palette.grey[300]}`,
              marginBottom: 3,
              position: 'static',
            }
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 3,
              pb: 2,
              borderBottom: '2px solid',
              borderColor: 'primary.main'
            }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                backgroundColor: 'primary.main', 
                borderRadius: '50%' 
              }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Categories
              </Typography>
            </Box>
            
            {/* All Products Button */}
            <CategoryButton
              active={selectedCategory === 'all'}
              onClick={() => handleCategoryChange('all')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>All Products</span>
                <Typography variant="caption" sx={{ 
                  opacity: 0.8,
                  fontWeight: selectedCategory === 'all' ? 600 : 400 
                }}>
                  ({products.length})
                </Typography>
              </Box>
            </CategoryButton>
            
            {/* Category Buttons with Enhanced Design */}
            {categoryData.map((category) => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>{category.name}</span>
                  <Typography variant="caption" sx={{ 
                    opacity: 0.8,
                    fontWeight: selectedCategory === category.id ? 600 : 400 
                  }}>
                    ({category.productCount})
                  </Typography>
                </Box>
              </CategoryButton>
            ))}
          </CategorySidebar>
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h2">
              {selectedCategory === 'all' 
                ? 'All Products' 
                : getCategoryName(selectedCategory)
              }
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {filteredProducts.length} products found
            </Typography>
          </Box>

          <ProductGrid container spacing={3} sx={{
            // Responsive spacing
            [theme => theme.breakpoints.down('sm')]: {
              spacing: 2,
            }
          }}>
            {filteredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} lg={4} key={product.id}>
                <Zoom 
                  in={!isTransitioning} 
                  timeout={300}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    component={Link}
                    to={`/product/${product.id}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s ease-in-out',
                      // Enhanced mobile touch targets
                      [theme => theme.breakpoints.down('md')]: {
                        minHeight: '400px',
                        padding: theme => theme.spacing(3),
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => `0 12px 24px ${theme.palette.grey[400]}40`,
                      }
                    }}
                  >
                    {/* Product Image */}
                    <ProductImageContainer>
                      <img 
                        src={product.image} 
                        alt={`${product.name} - ${getCategoryName(product.categoryId)}`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                        }}
                        style={{
                          transition: 'opacity 0.3s ease',
                        }}
                        onLoad={(e) => {
                          e.target.style.opacity = '1';
                        }}
                      />
                      
                      {/* Enhanced Badge System */}
                      <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {/* Trending Badge for Popular Items */}
                        {product.rating.average >= 4.5 && (
                          <Box
                            sx={{
                              backgroundColor: 'success.main',
                              color: 'white',
                              borderRadius: 1,
                              px: 1,
                              py: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            <TrendingUp sx={{ fontSize: 14 }} />
                            Popular
                          </Box>
                        )}
                        
                        {/* Discount Badge */}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <Box
                            sx={{
                              backgroundColor: 'error.main',
                              color: 'white',
                              borderRadius: 1,
                              px: 1,
                              py: 0.5,
                              fontSize: '0.75rem',
                              fontWeight: 700,
                            }}
                          >
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Box>
                        )}
                      </Box>

                      {/* Quick Action Overlay - Typical Figma Pattern */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          '.MuiCard-root:hover &': {
                            opacity: 1,
                          }
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: 'white',
                            boxShadow: 1,
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                            }
                          }}
                        >
                          <Star sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </ProductImageContainer>

                  {/* Product Content */}
                  <ProductContent className="product-content">
                    <Typography variant="h3" gutterBottom sx={{
                      transition: 'color 0.2s ease-in-out',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      height: '2.6em', // Fixed height for consistent layout
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {product.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description.substring(0, 100)}...
                    </Typography>

                    {/* Rating */}
                    <RatingContainer>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            sx={{
                              fontSize: 16,
                              color: i < Math.floor(product.rating.average) 
                                ? 'warning.main' 
                                : 'grey.300'
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="caption">
                        {product.rating.average} ({product.rating.count})
                      </Typography>
                    </RatingContainer>

                    {/* Price */}
                    <PriceContainer>
                      <PrimaryPrice variant="h3">
                        ${product.price}
                      </PrimaryPrice>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <OriginalPrice variant="body2">
                          ${product.originalPrice}
                        </OriginalPrice>
                      )}
                    </PriceContainer>

                    {/* Stock Status */}
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <StockStatus 
                        inStock={product.inStock}
                        label={product.inStock ? 'In Stock' : 'Out of Stock'}
                        size="small"
                      />
                    </Box>

                    {/* Add to Cart Button */}
                    <PrimaryActionButton
                      fullWidth
                      variant="contained"
                      disabled={!product.inStock}
                      sx={{ 
                        mt: 'auto',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover:not(:disabled)': {
                          transform: 'scale(1.02)',
                        }
                      }}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </PrimaryActionButton>
                  </ProductContent>
                </ProductCard>
              </Zoom>
            </Grid>
          ))}
          </ProductGrid>

          {/* No Products Message */}
          {filteredProducts.length === 0 && !isTransitioning && (
            <Fade in={!isTransitioning} timeout={600}>
              <Box sx={{ 
                textAlign: 'center', 
                py: 8,
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                borderRadius: 2,
                border: '1px dashed #ccc',
              }}>
                <Typography variant="h3" gutterBottom sx={{ 
                  color: 'text.secondary',
                  mb: 2 
                }}>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Try selecting a different category or check back later.
                </Typography>
                <PrimaryActionButton 
                  onClick={() => handleCategoryChange('all')}
                  sx={{ mt: 2 }}
                >
                  View All Products
                </PrimaryActionButton>
              </Box>
            </Fade>
          )}

          {/* Promotional Section - Typical Figma E-commerce Pattern */}
          {filteredProducts.length > 0 && (
            <Box sx={{ 
              mt: 8, 
              p: 4, 
              background: 'linear-gradient(135deg, #DB444408 0%, #00FF6608 100%)',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              textAlign: 'center'
            }}>
              <Typography variant="h3" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
                🎉 Special Offers
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Don't miss out on our latest deals and exclusive products
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label="Free Shipping on $50+" 
                  sx={{ backgroundColor: 'success.main', color: 'white', fontWeight: 600 }}
                />
                <Chip 
                  label="30-Day Returns" 
                  sx={{ backgroundColor: 'info.main', color: 'white', fontWeight: 600 }}
                />
                <Chip 
                  label="24/7 Support" 
                  sx={{ backgroundColor: 'warning.main', color: 'white', fontWeight: 600 }}
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Newsletter Section - Common Figma Pattern */}
      <Box sx={{ 
        mt: 12, 
        p: 6, 
        backgroundColor: 'grey.900', 
        color: 'white',
        borderRadius: 3,
        textAlign: 'center'
      }}>
        <Typography variant="h2" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
          Stay Updated
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: '500px', mx: 'auto' }}>
          Subscribe to our newsletter for the latest tech products, exclusive deals, and insider updates.
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          maxWidth: '400px', 
          mx: 'auto',
          [theme => theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          }
        }}>
          <TextField
            fullWidth
            placeholder="Enter your email"
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <PrimaryActionButton variant="contained" sx={{ whiteSpace: 'nowrap', px: 4 }}>
            Subscribe
          </PrimaryActionButton>
        </Box>
      </Box>
    </MainContainer>
  );
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
