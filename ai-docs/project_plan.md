# E-Commerce Project Implementation Plan

## Overview
This document provides a detailed, step-by-step blueprint for building the e-commerce frontend application. The plan is broken down into small, iterative chunks that build on each other safely, with each step providing incremental progress toward the final goal.

## Project Foundation Review
- **Current State**: React + Vite + MUI + TanStack Router + Styled Components
- **Target**: E-commerce frontend with product browsing and detail views
- **Constraint**: 1-hour build time with focus on core functionality
- **Approach**: Incremental development with no orphaned code

---

## Master Blueprint

### Phase 1: Foundation Setup (20 minutes)
**Goal**: Establish core data structure and remove existing pages

### Phase 2: Layout & Navigation (20 minutes) 
**Goal**: Create header, sidebar, and basic routing structure

### Phase 3: Product Display (15 minutes)
**Goal**: Implement product cards and grid layout with filtering

### Phase 4: Product Details (5 minutes)
**Goal**: Create product detail page and integrate navigation

---

## Detailed Step Breakdown

### STEP 1: Clean Slate & Data Foundation
**Time Estimate**: 5 minutes
**Dependencies**: None
**Outcome**: Clean project structure with product data

```
Remove the existing dashboard, users, and projects pages from the routes folder, and replace the existing mock data files with a new products.json file. Create a comprehensive product dataset with 3-4 products per category (covering computers, tablets, cell phones, smart watches, mobile accessories, headphones, speakers, TV & video, and video games & consoles). Each product should include id, name, categoryId, price, description, brand, rating, reviewCount, inStock, mainImage, thumbnails, and specifications. Use placeholder images from Unsplash for product photos. Make sure the JSON structure matches exactly what's defined in the specification document.
```

### STEP 2: Update Root Layout Structure
**Time Estimate**: 3 minutes
**Dependencies**: Step 1
**Outcome**: Root layout prepared for e-commerce structure

```
Modify the __root.jsx file to include a basic layout structure for the e-commerce app. Update the theme configuration to include specific colors that match the e-commerce design (black header, appropriate primary colors). Remove any references to the old router devtools positioning and prepare the root component to accept the Header, CategorySidebar, and main content area. Keep the existing MUI theme provider structure but adjust the theme object for e-commerce styling needs.
```

### STEP 3: Create Header Component Foundation
**Time Estimate**: 4 minutes
**Dependencies**: Step 2  
**Outcome**: Functional header with search and cart UI

```
Create a new Header component in src/components/Header.jsx using MUI styled components. The header should have a black background (#000000) with white text, include a search bar with placeholder "What are you looking for?" and a search icon, display a shopping cart icon with a badge (showing "0" initially), and include a user account icon. Use MUI's AppBar, Toolbar, InputBase, IconButton, and Badge components. Style everything using the styled() function to match the Figma design. The header should be responsive and span the full width. Import and use Search, ShoppingCart, and AccountCircle icons from @mui/icons-material.
```

### STEP 4: Create Category Sidebar Component
**Time Estimate**: 4 minutes
**Dependencies**: Step 1, Step 3
**Outcome**: Interactive category navigation

```
Create a CategorySidebar component in src/components/CategorySidebar.jsx that displays the 9 product categories from the products.json file. Use MUI styled components to create a clean, vertical list with hover effects and active state highlighting. Import the categories from the products.json file and map through them to create clickable list items. Add onClick handlers that will accept a callback function for category filtering (we'll wire this up in the next step). Style the sidebar with appropriate spacing, typography, and hover effects. The sidebar should have a light background and clean typography that matches the Figma design.
```

### STEP 5: Create Product Card Component
**Time Estimate**: 4 minutes
**Dependencies**: Step 1
**Outcome**: Reusable product display card

```
Create a ProductCard component in src/components/ProductCard.jsx that displays individual products in a card format. The card should show the product image (with 1:1 aspect ratio), product name (with text truncation for long names), price formatted with dollar sign, star rating display using MUI Rating component, and review count in parentheses. Use MUI styled components for layout with Card, CardMedia, CardContent, Typography, and Rating components. Add hover effects that slightly elevate the card and include an eye icon overlay for quick view. The card should be clickable and accept an onClick handler for navigation. Style according to the Figma design with proper spacing and shadows.
```

### STEP 6: Create Custom Products Hook
**Time Estimate**: 2 minutes
**Dependencies**: Step 1
**Outcome**: Data management logic

```
Create a custom React hook in src/hooks/useProducts.js that manages product data and filtering logic. The hook should import the products.json data, provide state for filtered products and active category, include functions for filtering products by category and getting related products by category, and return an object with products, categories, filteredProducts, activeCategory, filterByCategory, and getRelatedProducts functions. Use React's useState and useMemo for efficient filtering and caching. This hook will be the single source of truth for all product data operations.
```

### STEP 7: Update Home Page with Product Grid
**Time Estimate**: 5 minutes
**Dependencies**: Steps 1-6
**Outcome**: Functional home page with product browsing

```
Replace the existing index.jsx route component with a new home page that displays products in a grid layout. Import and use the useProducts hook, ProductCard component, CategorySidebar, and Header components. Create a layout with the header at top, category sidebar on the left, and main content area showing "Explore Our Products" title with a responsive product grid (3 columns on desktop, 2 on tablet, 1 on mobile). Wire up the category filtering by passing the filterByCategory function to the CategorySidebar. Add a "View All Products" button that clears the category filter. Use MUI Grid and Container components with styled components for layout. Ensure proper spacing and responsive behavior.
```

### STEP 8: Integrate Layout in Root Component
**Time Estimate**: 3 minutes
**Dependencies**: Steps 2-7
**Outcome**: Complete layout integration

```
Update the __root.jsx component to include the Header component at the top of the layout, ensuring it's rendered above the main content area where the Outlet component displays the current route. The layout should have the header fixed at the top, with the main content area below it. Don't include the CategorySidebar in the root layout since it should only appear on the home page. Ensure proper z-index and positioning so the header stays on top. Test that navigation between routes still works correctly with the header in place.
```

### STEP 9: Create Product Detail Route Structure
**Time Estimate**: 2 minutes
**Dependencies**: Step 1, Step 6
**Outcome**: Product detail page foundation

```
Create a new route file src/routes/product.$id.jsx for the product detail page. Set up the basic component structure that uses the useProducts hook to find a product by ID from the route parameters. Handle the case where a product is not found by showing an error state or redirecting to home. Create a basic layout structure that includes breadcrumb navigation (Account > [Category] > [Product Name]) and a container for the product content. Use TanStack Router's useParams to get the product ID and implement proper error handling for invalid IDs.
```

### STEP 10: Create Product Gallery Component
**Time Estimate**: 3 minutes
**Dependencies**: Step 9
**Outcome**: Product image display system

```
Create a ProductGallery component in src/components/ProductGallery.jsx that displays the main product image with a sidebar of thumbnail images. Use MUI styled components to create a layout with the main image on the right and thumbnails stacked vertically on the left. Implement thumbnail click functionality to change the main image. Add proper styling with borders, hover effects on thumbnails, and responsive behavior. The component should accept mainImage and thumbnails props from the product data. Style according to the Figma design with appropriate spacing and aspect ratios.
```

### STEP 11: Complete Product Detail Page
**Time Estimate**: 5 minutes
**Dependencies**: Steps 9-10
**Outcome**: Full product detail functionality

```
Complete the product detail page by adding the ProductGallery component and all product information display. Show the product name, rating with star display, review count, price, and description. Add a quantity selector with + and - buttons and a number input. Include "Buy Now" and wishlist (heart icon) buttons with proper styling. Add delivery information sections for free delivery and returns. Use MUI components like Typography, Button, IconButton, Rating, and styled components for layout. Wire up the quantity selector to work with local state. Style everything to match the Figma design with proper spacing and button styling.
```

### STEP 12: Add Related Products Section
**Time Estimate**: 3 minutes
**Dependencies**: Steps 6, 11
**Outcome**: Complete product detail experience

```
Add a RelatedProducts component to the product detail page that shows 4 related products from the same category. Use the getRelatedProducts function from the useProducts hook to fetch products from the same category (excluding the current product). Display these in a horizontal grid using the existing ProductCard component. Add a "Related Items" section title and proper spacing. Ensure the related products are clickable and navigate to their respective product detail pages. Style the section to match the Figma design with appropriate margins and grid spacing.
```

### STEP 13: Implement Navigation Wiring
**Time Estimate**: 2 minutes
**Dependencies**: Steps 7, 11-12
**Outcome**: Complete navigation flow

```
Wire up all navigation between components. In the ProductCard component, add navigation to the product detail page using TanStack Router's Link component or useNavigate hook. In the CategorySidebar, add navigation back to home with category filters. In the product detail breadcrumb, wire up the category link to navigate home with that category pre-filtered. Ensure all navigation preserves state appropriately and provides smooth user experience. Test the complete flow: home → category filter → product detail → related product → back to home.
```

### STEP 14: Add Loading States and Error Handling
**Time Estimate**: 2 minutes
**Dependencies**: Steps 1-13
**Outcome**: Robust user experience

```
Add proper loading states and error handling throughout the application. In the useProducts hook, add loading state management. In ProductCard components, add skeleton loading placeholders for images. In the product detail page, handle missing products gracefully with error messages. Add fallback images for products with broken image URLs. Implement proper error boundaries where needed. Use MUI Skeleton components for loading states and Alert components for error messages. Ensure the app handles edge cases gracefully without crashing.
```

### STEP 15: Final Polish and Responsive Optimization
**Time Estimate**: 3 minutes
**Dependencies**: Steps 1-14
**Outcome**: Production-ready PoC

```
Add final polish to the application including hover effects, smooth transitions, and responsive design optimization. Ensure the product grid properly responds to different screen sizes (3 columns desktop, 2 tablet, 1 mobile). Add smooth hover effects to all interactive elements including product cards, buttons, and navigation items. Optimize the category sidebar for mobile with proper responsive behavior. Test the complete application flow, fix any styling inconsistencies, and ensure all interactions feel smooth and professional. Verify that the application matches the Figma design requirements and provides a complete e-commerce browsing experience.
```

---

## Implementation Strategy

### Prompt Guidelines
1. **Each prompt is self-contained** - includes all necessary context
2. **Builds incrementally** - references previous steps when needed
3. **No orphaned code** - every piece integrates immediately
4. **Specific requirements** - exact components, styling, and functionality
5. **Error handling included** - proper fallbacks and edge cases
6. **Testing guidance** - how to verify each step works

### Safety Measures
- **Small increments** - each step is 2-5 minutes of work
- **Immediate integration** - code works after each step
- **Rollback friendly** - easy to undo if step fails
- **Dependencies clear** - know exactly what each step needs
- **Verification points** - specific outcomes to validate

### Quality Assurance
- **MUI styled components** - consistent with existing codebase
- **TypeScript ready** - clean JavaScript that converts easily
- **Performance focused** - efficient filtering and rendering
- **Responsive design** - mobile-first approach
- **Accessibility** - proper ARIA labels and keyboard navigation

---

## Success Metrics

### After Step 7 (Minimum Viable Product)
- ✅ Product browsing works
- ✅ Category filtering functional
- ✅ Basic navigation implemented
- ✅ Responsive grid layout

### After Step 13 (Complete Navigation)
- ✅ Full product detail pages
- ✅ Complete navigation flow
- ✅ Related products working
- ✅ Breadcrumb navigation

### After Step 15 (Production Ready)
- ✅ Polished user experience
- ✅ Error handling implemented
- ✅ Loading states added
- ✅ Mobile responsive design
- ✅ Matches Figma design requirements

---

## Risk Mitigation

### Common Failure Points
1. **JSON data structure** - Validate format in Step 1
2. **Router integration** - Test navigation early in Step 13
3. **Image loading** - Implement fallbacks in Step 14
4. **Responsive layout** - Test breakpoints in Step 15

### Recovery Strategies
- Each step includes verification criteria
- Dependencies clearly mapped for rollback
- Alternative approaches noted for complex steps
- Performance checkpoints throughout process

---

**Total Implementation Time**: 60 minutes
**Prompt Count**: 15 prompts
**Average Prompt Time**: 4 minutes
**Buffer Time**: Built into each estimate for testing and integration
