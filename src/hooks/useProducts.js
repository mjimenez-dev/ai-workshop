import { useState, useEffect, useMemo, useCallback } from 'react';

// Custom hook for managing product data and operations
// Reference: ai-docs/todo.md Step 3 and ai-docs/project_plan.md Step 3
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 3;
  const retryDelay = 1000;

  // Load products and categories data with retry logic
  const loadData = useCallback(async (isRetry = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
      }
      setError(null);

      // Simulate network delay for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, isRetry ? retryDelay : 500));

      // Load products and categories in parallel
      const [productsResponse, categoriesResponse] = await Promise.all([
        import('../data/products.json'),
        import('../data/categories.json')
      ]);

      setProducts(productsResponse.default || []);
      setCategories(categoriesResponse.default || []);
      setRetryCount(0); // Reset on success
    } catch (err) {
      console.error('Error loading product data:', err);
      const errorMessage = `Failed to load product data: ${err.message || 'Unknown error'}`;
      setError(errorMessage);
      
      // Auto-retry with exponential backoff
      if (retryCount < maxRetries) {
        console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadData(true);
        }, retryDelay * (retryCount + 1));
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  // Manual retry function
  const retry = useCallback(() => {
    setRetryCount(0);
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get all products
  const getAllProducts = useMemo(() => {
    return products;
  }, [products]);

  // Get products by category
  const getProductsByCategory = useMemo(() => {
    return (categoryId) => {
      if (!categoryId || categoryId === 'all') {
        return products;
      }
      return products.filter(product => product.categoryId === categoryId);
    };
  }, [products]);

  // Get single product by ID
  const getProductById = useMemo(() => {
    return (productId) => {
      return products.find(product => product.id === productId) || null;
    };
  }, [products]);

  // Get related products (same category, excluding current product)
  const getRelatedProducts = useMemo(() => {
    return (productId, limit = 4) => {
      const currentProduct = getProductById(productId);
      if (!currentProduct) return [];

      return products
        .filter(product => 
          product.categoryId === currentProduct.categoryId && 
          product.id !== productId
        )
        .slice(0, limit);
    };
  }, [products, getProductById]);

  // Get products by search term (for future search functionality)
  const searchProducts = useMemo(() => {
    return (searchTerm) => {
      if (!searchTerm) return products;
      
      const term = searchTerm.toLowerCase();
      return products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.categoryId.toLowerCase().includes(term)
      );
    };
  }, [products]);

  // Get category name by ID
  const getCategoryName = useMemo(() => {
    return (categoryId) => {
      const category = categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown Category';
    };
  }, [categories]);

  // Get featured products (highest rated, in stock)
  const getFeaturedProducts = useMemo(() => {
    return (limit = 8) => {
      return products
        .filter(product => product.inStock)
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, limit);
    };
  }, [products]);

  // Get products on sale (with discounts)
  const getSaleProducts = useMemo(() => {
    return () => {
      return products.filter(product => {
        // Calculate if there's a discount based on price difference
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        return hasDiscount && product.inStock;
      });
    };
  }, [products]);

  return {
    // Data
    products: getAllProducts,
    categories,
    
    // Loading states
    loading,
    error,
    retryCount,
    
    // Core functions (matching todo.md requirements)
    getAllProducts: () => getAllProducts,
    getProductsByCategory,
    getProductById,
    
    // Enhanced functions for e-commerce features
    getRelatedProducts,
    searchProducts,
    getCategoryName,
    getFeaturedProducts,
    getSaleProducts,
    
    // Utility functions
    hasProducts: getAllProducts.length > 0,
    hasCategories: categories.length > 0,
    retry, // Manual retry function
  };
};

export default useProducts;
