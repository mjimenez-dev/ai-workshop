// Performance Testing Utilities
// Reference: ai-docs/todo.md Step 15 and ai-docs/app_flow.md Performance Targets

export const performanceTest = {
  // Track page load time
  measurePageLoad: () => {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
      
      // Check against target: < 2 seconds (2000ms)
      if (loadTime < 2000) {
        console.log('✅ Page load time target met');
      } else {
        console.warn('⚠️ Page load time exceeds target (2000ms)');
      }
    });
  },

  // Track navigation speed
  measureNavigation: (startTime) => {
    const navigationTime = performance.now() - startTime;
    console.log(`Navigation time: ${navigationTime.toFixed(2)}ms`);
    
    // Check against target: < 1 second (1000ms)
    if (navigationTime < 1000) {
      console.log('✅ Navigation speed target met');
    } else {
      console.warn('⚠️ Navigation speed exceeds target (1000ms)');
    }
    
    return navigationTime;
  },

  // Track category filter response time
  measureCategoryFilter: () => {
    const startTime = performance.now();
    
    return () => {
      const filterTime = performance.now() - startTime;
      console.log(`Category filter time: ${filterTime.toFixed(2)}ms`);
      
      // Check against target: < 500ms
      if (filterTime < 500) {
        console.log('✅ Category filter speed target met');
      } else {
        console.warn('⚠️ Category filter speed exceeds target (500ms)');
      }
      
      return filterTime;
    };
  },

  // Check for console errors
  monitorErrors: () => {
    let errorCount = 0;
    const originalError = console.error;
    
    console.error = (...args) => {
      errorCount++;
      originalError.apply(console, args);
      
      // Log error rate
      const errorRate = (errorCount / (Date.now() / 1000)) * 100;
      if (errorRate > 5) {
        console.warn(`⚠️ High error rate detected: ${errorRate.toFixed(2)}%`);
      }
    };
    
    // Return error count getter
    return () => errorCount;
  },

  // Memory usage monitoring
  checkMemoryUsage: () => {
    if (performance.memory) {
      const memory = performance.memory;
      console.log('Memory Usage:', {
        used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
      });
      
      // Warn if memory usage is high
      const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercent > 80) {
        console.warn(`⚠️ High memory usage: ${usagePercent.toFixed(2)}%`);
      }
    }
  },

  // Run all performance tests
  runAllTests: () => {
    console.log('🚀 Starting performance monitoring...');
    
    performanceTest.measurePageLoad();
    const getErrorCount = performanceTest.monitorErrors();
    
    // Check memory every 30 seconds
    setInterval(() => {
      performanceTest.checkMemoryUsage();
    }, 30000);
    
    // Summary after 5 seconds
    setTimeout(() => {
      console.log('📊 Performance Summary:');
      console.log(`Errors detected: ${getErrorCount()}`);
      performanceTest.checkMemoryUsage();
    }, 5000);
  }
};

export default performanceTest;
