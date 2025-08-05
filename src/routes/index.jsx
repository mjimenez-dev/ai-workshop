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
  Button
} from '@mui/material';
import { 
  MainContainer,
  CategorySidebar,
  CategoryButton,
  ProductCard,
  ProductImageContainer,
  ProductContent,
  PrimaryActionButton
} from '../components/StyledComponents';
import { Star } from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { Link } from '@tanstack/react-router';
import { ProductGridSkeleton, CategorySidebarSkeleton } from '../components/SkeletonLoaders.jsx';

const HomeComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { 
    categories, 
    loading, 
    error, 
    getProductsByCategory,
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
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Explore Our Products
          </Typography>
          <Box sx={{ 
            display: 'flex',
            gap: 3,
            alignItems: 'flex-start'
          }}>
            <Box sx={{
              minWidth: '200px',
              maxWidth: '220px',
              flexShrink: 0
            }}>
              <CategorySidebarSkeleton />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ mb: 3 }}>
                <CircularProgress size={20} sx={{ mr: 2 }} />
                <Typography variant="h6" component="span">
                  Loading products...
                </Typography>
              </Box>
              <ProductGridSkeleton count={6} />
            </Box>
          </Box>
        </Box>
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
      <Box sx={{ py: 3 }}>
        {/* Main Content Flex Layout - Match Figma Layout */}
        <Box sx={{ 
          display: 'flex',
          gap: 3,
          minHeight: '100vh',
          alignItems: 'flex-start'
        }}>
          {/* Category Sidebar - Clean Design */}
          <Box sx={{
            minWidth: '200px',
            maxWidth: '220px',
            flexShrink: 0
          }}>
            <CategorySidebar sx={{
              backgroundColor: 'white',
              border: '1px solid #E5E5E5',
              borderRadius: 1,
              p: 1.5,
              height: 'fit-content',
              position: 'sticky',
              top: 20,
              width: '100%',
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 1.5, 
                color: 'text.primary',
                fontSize: '0.95rem',
                borderBottom: '1px solid #E5E5E5',
                pb: 1
              }}>
                Categories
              </Typography>
              
              {/* All Products Button */}
              <CategoryButton
                active={selectedCategory === 'all'}
                onClick={() => handleCategoryChange('all')}
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  py: 0.6,
                  px: 0.8,
                  mb: 0.2,
                  borderRadius: 0.5,
                  color: selectedCategory === 'all' ? '#DB4444' : 'text.secondary',
                  backgroundColor: selectedCategory === 'all' ? '#FFF5F5' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#FFF5F5',
                    color: '#DB4444'
                  }
                }}
              >
                All Products
              </CategoryButton>
              
              {/* Category Buttons */}
              {categoryData.map((category) => (
                <CategoryButton
                  key={category.id}
                  active={selectedCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    py: 0.6,
                    px: 0.8,
                    mb: 0.2,
                    borderRadius: 0.5,
                    color: selectedCategory === category.id ? '#DB4444' : 'text.secondary',
                    backgroundColor: selectedCategory === category.id ? '#FFF5F5' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#FFF5F5',
                      color: '#DB4444'
                    }
                  }}
                >
                  {category.name}
                </CategoryButton>
              ))}
            </CategorySidebar>
          </Box>

          {/* Product Grid - Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Page Title */}
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              mb: 3
            }}>
              Explore Our Products
            </Typography>

            {/* Product Grid - 3 columns like Figma */}
            <Grid container spacing={2}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        border: '1px solid #E5E5E5',
                        borderRadius: 2,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          borderColor: 'primary.main',
                        }
                      }}
                    >
                      {/* Product Image */}
                      <ProductImageContainer sx={{ 
                        position: 'relative',
                        height: 180,
                        overflow: 'hidden',
                        backgroundColor: '#F9F9F9'
                      }}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                        
                        {/* View Product Icon - Like Figma */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            '.MuiCard-root:hover &': {
                              opacity: 1,
                            }
                          }}
                        >
                          👁️
                        </Box>

                        {/* Discount Badge */}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              backgroundColor: '#DB4444',
                              color: 'white',
                              borderRadius: 0.5,
                              px: 1,
                              py: 0.5,
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Box>
                        )}
                      </ProductImageContainer>

                      {/* Product Content */}
                      <ProductContent sx={{ 
                        p: 1.5, 
                        flexGrow: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 0.8
                      }}>
                        <Typography variant="h6" sx={{
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          lineHeight: 1.3,
                          color: 'text.primary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {product.name}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                          <Typography variant="h6" sx={{
                            color: '#DB4444',
                            fontWeight: 600,
                            fontSize: '0.95rem'
                          }}>
                            ${product.price}
                          </Typography>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <Typography variant="body2" sx={{
                              textDecoration: 'line-through',
                              color: 'text.secondary',
                              fontSize: '0.8rem'
                            }}>
                              ${product.originalPrice}
                            </Typography>
                          )}
                        </Box>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                sx={{
                                  fontSize: 14,
                                  color: i < Math.floor(product.rating.average) 
                                    ? '#FFAD33' 
                                    : '#E5E5E5'
                                }}
                              />
                            ))}
                          </Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                            ({product.rating.count})
                          </Typography>
                        </Box>

                        {/* Add to Cart Button */}
                        <PrimaryActionButton
                          fullWidth
                          variant="contained"
                          disabled={!product.inStock}
                          sx={{ 
                            mt: 1.5,
                            backgroundColor: '#DB4444',
                            color: 'white',
                            py: 0.8,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: '#B73E3E',
                            },
                            '&:disabled': {
                              backgroundColor: '#E5E5E5',
                              color: '#999',
                            }
                          }}
                        >
                          {product.inStock ? 'Add To Cart' : 'Out of Stock'}
                        </PrimaryActionButton>
                      </ProductContent>
                    </ProductCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>

            {/* View All Products Button - Like Figma */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4, 
              mb: 2 
            }}>
              <PrimaryActionButton
                variant="contained"
                sx={{
                  backgroundColor: '#DB4444',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#B73E3E',
                  }
                }}
              >
                View All Products
              </PrimaryActionButton>
            </Box>

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
          </Box>
        </Box>
      </Box>
    </MainContainer>
  );
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
