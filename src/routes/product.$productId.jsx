import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Grid, 
  Box,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
  Button,
  IconButton,
  Fade
} from '@mui/material';
import { 
  MainContainer,
  ProductImageContainer,
  ProductContent,
  PriceContainer,
  PrimaryPrice,
  OriginalPrice,
  PrimaryActionButton,
  SecondaryActionButton,
  StockStatus,
  RatingContainer,
  ProductGrid,
  ProductCard
} from '../components/StyledComponents';
import { 
  Star, 
  ArrowBack, 
  Share, 
  FavoriteBorder,
  ShoppingCart,
  LocalShipping,
  Security,
  Support
} from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { Link as RouterLink, useNavigate } from '@tanstack/react-router';

const ProductDetailComponent = () => {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const { 
    getProductById, 
    getRelatedProducts, 
    getCategoryName,
    loading, 
    error 
  } = useProducts();

  // Get product and related products
  const product = useMemo(() => getProductById(productId), [productId, getProductById]);
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product.id).slice(0, 4); // Limit to 4 for MVP
  }, [product, getRelatedProducts]);

  if (loading) {
    return (
      <MainContainer sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product details...
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
        <Button 
          onClick={() => navigate({ to: '/' })}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </MainContainer>
    );
  }

  if (!product) {
    return (
      <MainContainer sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          Product not found. Redirecting to home page...
        </Alert>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The product you're looking for doesn't exist or may have been removed.
        </Typography>
        <PrimaryActionButton 
          onClick={() => navigate({ to: '/' })}
          startIcon={<ArrowBack />}
        >
          Browse All Products
        </PrimaryActionButton>
      </MainContainer>
    );
  }

  // Create image gallery (for now using single image with fallbacks)
  const productImages = [
    product.image,
    'https://via.placeholder.com/600x400?text=Product+View+2',
    'https://via.placeholder.com/600x400?text=Product+View+3',
    'https://via.placeholder.com/600x400?text=Product+View+4'
  ];

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      setIsAddedToCart(true);
      // Reset after 3 seconds for demo
      setTimeout(() => setIsAddedToCart(false), 3000);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Mock size and color options for demo
  const availableSizes = ['S', 'M', 'L', 'XL'];
  const availableColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#DB4444' },
    { name: 'Blue', value: '#1976D2' }
  ];

  return (
    <MainContainer maxWidth="xl">
      {/* Breadcrumbs */}
      <Box sx={{ py: 2 }}>
        <Breadcrumbs separator="›" sx={{ fontSize: '0.875rem' }}>
          <Link 
            component={RouterLink}
            to="/"
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' }
            }}
          >
            Home
          </Link>
          <Link 
            component={RouterLink}
            to="/"
            search={{ category: product.categoryId }}
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {getCategoryName(product.categoryId)}
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 500 }}>
            {product.name}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button 
          onClick={() => navigate({ to: '/' })}
          startIcon={<ArrowBack />}
          sx={{ 
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          Back to Products
        </Button>
      </Box>

      {/* Main Product Content */}
      <Grid container spacing={6}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Main Image */}
            <ProductImageContainer 
              sx={{ 
                aspectRatio: '1/1',
                mb: 2,
                maxHeight: '500px',
                cursor: 'zoom-in'
              }}
            >
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
                }}
              />
            </ProductImageContainer>

            {/* Image Thumbnails */}
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
              {productImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: 80,
                    height: 80,
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: selectedImageIndex === index ? 2 : 1,
                    borderColor: selectedImageIndex === index ? 'primary.main' : 'grey.300',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                    }
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=Thumb';
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            {/* Product Title */}
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 2
              }}
            >
              {product.name}
            </Typography>

            {/* Rating and Reviews */}
            <RatingContainer sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      sx={{
                        fontSize: 20,
                        color: i < Math.floor(product.rating.average) 
                          ? 'warning.main' 
                          : 'grey.300'
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {product.rating.average}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
            </RatingContainer>

            {/* Price */}
            <PriceContainer sx={{ mb: 4 }}>
              <PrimaryPrice variant="h2" sx={{ fontSize: '2rem', fontWeight: 700 }}>
                ${product.price}
              </PrimaryPrice>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <OriginalPrice variant="h4" sx={{ fontSize: '1.5rem' }}>
                    ${product.originalPrice}
                  </OriginalPrice>
                  <Chip 
                    label={`${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
                    color="error"
                    size="small"
                    sx={{ ml: 1, fontWeight: 600 }}
                  />
                </>
              )}
            </PriceContainer>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <StockStatus 
                inStock={product.inStock}
                label={product.inStock ? 'In Stock - Ready to Ship' : 'Out of Stock'}
              />
            </Box>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Size Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      minWidth: 48,
                      height: 48,
                      borderRadius: 1,
                      fontWeight: 600,
                      ...(selectedSize === size && {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        }
                      })
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Color Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {availableColors.map((color) => (
                  <Button
                    key={color.name}
                    variant={selectedColor === color.name ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setSelectedColor(color.name)}
                    sx={{
                      minWidth: 80,
                      height: 48,
                      borderRadius: 1,
                      fontWeight: 500,
                      position: 'relative',
                      ...(selectedColor === color.name && {
                        backgroundColor: 'primary.main',
                        borderColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        }
                      }),
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 16,
                        height: 16,
                        backgroundColor: color.value,
                        borderRadius: '50%',
                        border: color.value === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }
                    }}
                  >
                    <span style={{ marginLeft: 20 }}>{color.name}</span>
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  sx={{ minWidth: 40 }}
                >
                  -
                </Button>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  sx={{ minWidth: 40 }}
                >
                  +
                </Button>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <PrimaryActionButton
                startIcon={isAddedToCart ? '✓' : <ShoppingCart />}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                sx={{ 
                  flex: 1,
                  backgroundColor: isAddedToCart ? 'success.main' : 'primary.main',
                  '&:hover': {
                    backgroundColor: isAddedToCart ? 'success.dark' : 'secondary.main',
                  }
                }}
              >
                {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </PrimaryActionButton>
              <IconButton 
                onClick={handleWishlistToggle}
                sx={{ 
                  border: 1, 
                  borderColor: isWishlisted ? 'primary.main' : 'grey.300',
                  color: isWishlisted ? 'primary.main' : 'inherit',
                  backgroundColor: isWishlisted ? 'primary.main' : 'transparent',
                  '&:hover': { 
                    borderColor: 'primary.main', 
                    color: isWishlisted ? 'primary.contrastText' : 'primary.main',
                    backgroundColor: isWishlisted ? 'primary.dark' : 'primary.light'
                  }
                }}
              >
                <FavoriteBorder sx={{ color: isWishlisted ? 'primary.contrastText' : 'inherit' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  border: 1, 
                  borderColor: 'grey.300',
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
                }}
              >
                <Share />
              </IconButton>
            </Box>

            {/* Features */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalShipping color="primary" />
                <Typography variant="body2">Free shipping on orders over $50</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Security color="primary" />
                <Typography variant="body2">1 year warranty included</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Support color="primary" />
                <Typography variant="body2">24/7 customer support</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
            Related Products
          </Typography>
          <ProductGrid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                <ProductCard
                  component={RouterLink}
                  to={`/product/${relatedProduct.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => `0 8px 24px ${theme.palette.grey[400]}40`,
                    }
                  }}
                >
                  <ProductImageContainer>
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x225?text=Product';
                      }}
                    />
                  </ProductImageContainer>
                  <ProductContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {relatedProduct.name}
                    </Typography>
                    <PriceContainer>
                      <PrimaryPrice variant="h6">
                        ${relatedProduct.price}
                      </PrimaryPrice>
                    </PriceContainer>
                  </ProductContent>
                </ProductCard>
              </Grid>
            ))}
          </ProductGrid>
        </Box>
      )}
    </MainContainer>
  );
};

export const Route = createFileRoute('/product/$productId')({
  component: ProductDetailComponent,
});
