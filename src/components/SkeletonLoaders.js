import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// Skeleton Components for Loading States
export const ProductCardSkeleton = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: theme.spacing(2),
}));

export const ProductGridSkeleton = ({ count = 6 }) => {
  return (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <ProductCardSkeleton>
            {/* Image Skeleton */}
            <Skeleton 
              variant="rectangular" 
              sx={{ 
                width: '100%', 
                aspectRatio: '4/3', 
                borderRadius: 1,
                mb: 3 
              }} 
            />
            
            {/* Title Skeleton */}
            <Skeleton 
              variant="text" 
              sx={{ 
                fontSize: '1.25rem', 
                mb: 1,
                width: '80%' 
              }} 
            />
            
            {/* Description Skeleton */}
            <Skeleton 
              variant="text" 
              sx={{ 
                fontSize: '0.875rem', 
                mb: 2,
                width: '100%' 
              }} 
            />
            <Skeleton 
              variant="text" 
              sx={{ 
                fontSize: '0.875rem', 
                mb: 2,
                width: '60%' 
              }} 
            />
            
            {/* Rating Skeleton */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={60} />
            </Box>
            
            {/* Price Skeleton */}
            <Skeleton 
              variant="text" 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 2,
                width: '40%' 
              }} 
            />
            
            {/* Stock Status Skeleton */}
            <Skeleton 
              variant="rounded" 
              sx={{ 
                width: 80, 
                height: 24,
                mb: 2 
              }} 
            />
            
            {/* Button Skeleton */}
            <Skeleton 
              variant="rounded" 
              sx={{ 
                width: '100%', 
                height: 48,
                mt: 'auto' 
              }} 
            />
          </ProductCardSkeleton>
        </Grid>
      ))}
    </Grid>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <Grid container spacing={6}>
      {/* Image Gallery Skeleton */}
      <Grid item xs={12} md={6}>
        <Box>
          {/* Main Image Skeleton */}
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              width: '100%', 
              aspectRatio: '1/1',
              maxHeight: '500px',
              borderRadius: 1,
              mb: 2 
            }} 
          />
          
          {/* Thumbnails Skeleton */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[...Array(4)].map((_, index) => (
              <Skeleton 
                key={index}
                variant="rectangular" 
                sx={{ 
                  width: 80, 
                  height: 80,
                  borderRadius: 1 
                }} 
              />
            ))}
          </Box>
        </Box>
      </Grid>
      
      {/* Product Info Skeleton */}
      <Grid item xs={12} md={6}>
        <Box>
          {/* Title Skeleton */}
          <Skeleton 
            variant="text" 
            sx={{ 
              fontSize: '2.5rem', 
              mb: 2,
              width: '90%' 
            }} 
          />
          
          {/* Rating Skeleton */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} variant="circular" width={20} height={20} />
            ))}
            <Skeleton variant="text" width={100} />
          </Box>
          
          {/* Price Skeleton */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: 120 }} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: 80 }} />
            <Skeleton variant="rounded" sx={{ width: 60, height: 24 }} />
          </Box>
          
          {/* Stock Status Skeleton */}
          <Skeleton variant="rounded" sx={{ width: 150, height: 32, mb: 3 }} />
          
          {/* Description Skeleton */}
          {[...Array(4)].map((_, index) => (
            <Skeleton 
              key={index}
              variant="text" 
              sx={{ 
                mb: 1,
                width: index === 3 ? '60%' : '100%' 
              }} 
            />
          ))}
          
          {/* Size Options Skeleton */}
          <Box sx={{ mt: 4, mb: 3 }}>
            <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 2, width: 60 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[...Array(4)].map((_, index) => (
                <Skeleton 
                  key={index}
                  variant="rounded" 
                  sx={{ width: 48, height: 48 }} 
                />
              ))}
            </Box>
          </Box>
          
          {/* Color Options Skeleton */}
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 2, width: 60 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[...Array(4)].map((_, index) => (
                <Skeleton 
                  key={index}
                  variant="rounded" 
                  sx={{ width: 80, height: 48 }} 
                />
              ))}
            </Box>
          </Box>
          
          {/* Quantity Skeleton */}
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 2, width: 80 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="rounded" sx={{ width: 40, height: 40 }} />
              <Skeleton variant="text" sx={{ width: 40 }} />
              <Skeleton variant="rounded" sx={{ width: 40, height: 40 }} />
            </Box>
          </Box>
          
          {/* Action Buttons Skeleton */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Skeleton variant="rounded" sx={{ flex: 1, height: 48 }} />
            <Skeleton variant="rounded" sx={{ width: 48, height: 48 }} />
            <Skeleton variant="rounded" sx={{ width: 48, height: 48 }} />
          </Box>
          
          {/* Features Skeleton */}
          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" sx={{ flex: 1 }} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export const CategorySidebarSkeleton = () => {
  return (
    <Box sx={{ 
      padding: 4,
      backgroundColor: 'background.default',
      borderRight: '1px solid',
      borderColor: 'grey.300',
      height: 'fit-content'
    }}>
      {/* Title Skeleton */}
      <Skeleton 
        variant="text" 
        sx={{ 
          fontSize: '1.5rem', 
          mb: 3,
          width: '80%' 
        }} 
      />
      
      {/* Category Buttons Skeleton */}
      {[...Array(10)].map((_, index) => (
        <Skeleton 
          key={index}
          variant="rounded" 
          sx={{ 
            width: '100%', 
            height: 44,
            mb: 1 
          }} 
        />
      ))}
    </Box>
  );
};

export default {
  ProductGridSkeleton,
  ProductDetailSkeleton,
  CategorySidebarSkeleton,
  ProductCardSkeleton
};
