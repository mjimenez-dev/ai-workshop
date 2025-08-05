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
  Zoom
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

const HomeComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { 
    products, 
    categories, 
    loading, 
    error, 
    getProductsByCategory,
    getCategoryName 
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
      <MainContainer sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading products...
        </Typography>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </MainContainer>
    );
  }

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

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Category Sidebar */}
        <Grid item xs={12} md={3}>
          <CategorySidebar>
            <Typography variant="h3" gutterBottom>
              Categories
            </Typography>
            
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

          <ProductGrid container spacing={3}>
            {filteredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} lg={4} key={product.id}>
                <Zoom 
                  in={!isTransitioning} 
                  timeout={300}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    sx={{
                      transition: 'all 0.3s ease-in-out',
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
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                      {/* Trending Badge for Popular Items */}
                      {product.rating.average >= 4.5 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            backgroundColor: 'success.main',
                            color: 'white',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <TrendingUp sx={{ fontSize: 14 }} />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            Popular
                          </Typography>
                        </Box>
                      )}
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
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
