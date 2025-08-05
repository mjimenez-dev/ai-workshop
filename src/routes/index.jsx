import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  CircularProgress,
  Alert
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
import { Star } from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';

const HomeComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { 
    products, 
    categories, 
    loading, 
    error, 
    getProductsByCategory,
    getCategoryName 
  } = useProducts();

  // Get filtered products based on selected category
  const filteredProducts = getProductsByCategory(selectedCategory);

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
              onClick={() => setSelectedCategory('all')}
            >
              All Products ({products.length})
            </CategoryButton>
            
            {/* Category Buttons */}
            {categories.map((category) => {
              const categoryProducts = getProductsByCategory(category.id);
              return (
                <CategoryButton
                  key={category.id}
                  active={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({categoryProducts.length})
                </CategoryButton>
              );
            })}
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
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} lg={4} key={product.id}>
                <ProductCard>
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
                  </ProductImageContainer>

                  {/* Product Content */}
                  <ProductContent>
                    <Typography variant="h3" gutterBottom>
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
                      sx={{ mt: 'auto' }}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </PrimaryActionButton>
                  </ProductContent>
                </ProductCard>
              </Grid>
            ))}
          </ProductGrid>

          {/* No Products Message */}
          {filteredProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h3" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try selecting a different category or check back later.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
