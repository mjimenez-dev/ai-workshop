# E-Commerce Frontend Application Specification

## Project Overview
A frontend e-commerce web application for browsing and viewing electronic products, organized by categories. This is a Proof of Concept (PoC) with a 1-hour build constraint, using static JSON data and focusing on core browsing functionality.

## Technical Stack
- **Frontend Framework**: React 19 with functional components
- **Build Tool**: Vite 7.0.6
- **UI Library**: Material-UI (MUI) 7.3.0
- **Styling**: MUI Styled Components API
- **Routing**: TanStack Router 1.130.12
- **Data Source**: Static JSON files
- **Development**: Hot Module Replacement, Router DevTools

## Application Architecture

### Layout Structure
- **Header**: Search functionality, cart icon, user account icon
- **Left Side Menu**: Category navigation (fixed sidebar)
- **Main Content Area**: Product grid/details
- **Footer**: Multi-column footer with links and app download options

### Pages & Routes
1. **Home Page** (`/`) - Product browsing with category filtering
2. **Product Detail Page** (`/product/:id`) - Individual product view

### Data Structure

#### Single JSON File: `src/data/products.json`
```json
{
  "categories": [
    {
      "id": "computers",
      "name": "Computers",
      "slug": "computers"
    },
    {
      "id": "tablets", 
      "name": "Tablets",
      "slug": "tablets"
    },
    {
      "id": "cell-phones",
      "name": "Cell Phones", 
      "slug": "cell-phones"
    },
    {
      "id": "smart-watches",
      "name": "Smart Watches",
      "slug": "smart-watches"
    },
    {
      "id": "mobile-accessories",
      "name": "Mobile Accessories",
      "slug": "mobile-accessories"
    },
    {
      "id": "headphones",
      "name": "Headphones",
      "slug": "headphones"
    },
    {
      "id": "speakers",
      "name": "Speakers",
      "slug": "speakers"
    },
    {
      "id": "tv-video",
      "name": "TV & Video",
      "slug": "tv-video"
    },
    {
      "id": "video-games-consoles",
      "name": "Video Games & Consoles",
      "slug": "video-games-consoles"
    }
  ],
  "products": [
    {
      "id": "product-1",
      "name": "Samsung Galaxy Tab A7",
      "categoryId": "tablets",
      "price": 500,
      "originalPrice": null,
      "description": "High-quality tablet with excellent display and performance",
      "brand": "Samsung",
      "model": "Galaxy Tab A7",
      "rating": 4.5,
      "reviewCount": 89,
      "inStock": true,
      "stockCount": 15,
      "mainImage": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      "thumbnails": [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100"
      ],
      "specifications": {
        "screen": "10.4 inches",
        "storage": "64GB",
        "ram": "4GB",
        "battery": "7040mAh"
      },
      "features": [
        "High resolution display",
        "Long battery life", 
        "Lightweight design"
      ]
    }
  ]
}
```

## Component Structure

### File Organization
```
src/
├── components/
│   ├── StyledComponents.js      # Reusable styled components
│   ├── Header.jsx               # App header with search/cart
│   ├── Footer.jsx               # App footer
│   ├── CategorySidebar.jsx      # Left navigation menu
│   ├── ProductCard.jsx          # Product grid item
│   ├── ProductGallery.jsx       # Product detail images
│   └── RelatedProducts.jsx      # Related items section
├── data/
│   └── products.json            # All product and category data
├── hooks/
│   └── useProducts.js           # Custom hook for product data
├── routes/
│   ├── __root.jsx              # Root layout with theme
│   ├── index.jsx               # Home page (replace existing)
│   └── product.$id.jsx         # Product detail page
├── utils/
│   └── helpers.js              # Utility functions
└── main.jsx                    # App entry point
```

## Detailed Component Specifications

### Header Component
- **Search Bar**: Placeholder "What are you looking for?" with search icon
- **Cart Icon**: Badge showing cart item count (UI only)
- **User Account Icon**: Profile/login indicator (UI only)
- **Styling**: Black background (#000000) with white text
- **Layout**: Full width, fixed positioning

### CategorySidebar Component
- **Categories List**: Vertical list of 9 product categories
- **Interactive States**: Hover effects, active category highlighting
- **Filtering**: onClick filters home page products by category
- **Styling**: Light background, clean typography
- **Behavior**: Click category → filter home page products

### Home Page (`/`)
- **Section Title**: "Explore Our Products"
- **Product Grid**: 3-column responsive layout
- **Product Cards**: Image, name, price, rating, review count
- **View All Button**: Shows all products (removes category filter)
- **Default State**: Shows all products from all categories
- **Filtered State**: Shows products from selected category only

### Product Detail Page (`/product/:id`)
- **Breadcrumb**: Account > [Category] > [Product Name]
- **Product Gallery**: Main image + thumbnail sidebar (3-4 thumbnails)
- **Product Info**: Name, rating, review count, price
- **Description**: Product description text
- **Quantity Selector**: +/- buttons with number input
- **Action Buttons**: "Buy Now" (primary), Wishlist heart (secondary)
- **Delivery Info**: Free delivery and return policy sections
- **Related Products**: 4-product horizontal grid from same category

### ProductCard Component
- **Product Image**: Aspect ratio 1:1, hover effects
- **Product Name**: Truncated if too long
- **Price**: Current price, original price (if discounted)
- **Rating**: Star display + review count in parentheses
- **Quick Actions**: Eye icon for quick view (hover state)
- **Click Behavior**: Navigate to product detail page

## User Experience & Interactions

### Navigation Flow
1. **Home → Category Filter**: Click sidebar category → filter products
2. **Home → Product Detail**: Click product card → navigate to `/product/:id`
3. **Product Detail → Home**: Breadcrumb navigation
4. **Product Detail → Category**: Breadcrumb category link → home with filter

### Interactive Elements
- **Category Sidebar**: Hover states, active highlighting
- **Product Cards**: Hover effects, smooth transitions
- **Search Bar**: Focus states (functionality not implemented)
- **Quantity Selector**: Working +/- buttons
- **Action Buttons**: Hover states, click feedback

### Responsive Design
- **Desktop**: 3-column product grid
- **Tablet**: 2-column product grid
- **Mobile**: 1-column product grid, collapsible sidebar

## Development Guidelines

### Styling Approach
- **Use MUI Styled Components**: Consistent with existing codebase
- **Theme Integration**: Leverage MUI theme system
- **Component Reusability**: Extend existing `StyledComponents.js`
- **Responsive Design**: MUI breakpoint system

### Data Management
- **Static Import**: Import JSON data directly
- **Custom Hook**: `useProducts()` for data access and filtering
- **State Management**: React useState for filters, cart UI
- **No Backend**: All data operations are client-side

### Performance Considerations
- **Image Optimization**: Use optimized placeholder images
- **Lazy Loading**: Implement for product images
- **Component Splitting**: Logical component separation
- **Efficient Filtering**: Optimize category filtering logic

## Implementation Priority (1-Hour Build)

### Phase 1: Core Structure (20 minutes)
1. Remove existing pages (dashboard, users, projects)
2. Create `products.json` with sample data (5-6 products)
3. Set up new route structure
4. Create basic Header and CategorySidebar components

### Phase 2: Home Page (20 minutes)
1. Implement ProductCard component
2. Create product grid layout
3. Add category filtering functionality
4. Style with MUI components

### Phase 3: Product Detail (15 minutes)
1. Create product detail route
2. Implement ProductGallery component
3. Add product information display
4. Create basic RelatedProducts section

### Phase 4: Polish & Testing (5 minutes)
1. Add hover effects and transitions
2. Test navigation flow
3. Responsive layout verification
4. Final styling adjustments

## Edge Cases & Fallbacks

### Data Handling
- **Missing Images**: Fallback to placeholder images
- **Empty Categories**: Show "No products found" message
- **Invalid Product ID**: Redirect to home page
- **Missing Product Data**: Show error state

### User Interface
- **Long Product Names**: Text truncation with ellipsis
- **Zero Reviews**: Hide rating display
- **Out of Stock**: Disable "Buy Now" button, show stock status
- **Loading States**: Skeleton loading for components

## Success Metrics (PoC Validation)

### Functional Requirements
- ✅ Browse products by category
- ✅ View product details
- ✅ Navigate between pages
- ✅ Responsive design
- ✅ Search UI (visual only)
- ✅ Cart UI (visual only)

### Technical Requirements
- ✅ Uses existing tech stack
- ✅ Follows current code patterns
- ✅ Implements MUI styled components
- ✅ Maintains development workflow
- ✅ Clean, maintainable code structure

## Future Enhancements (Beyond PoC)

### Functionality
- Real search implementation
- Shopping cart with persistence
- User authentication
- Product reviews and ratings
- Wishlist functionality
- Advanced filtering (price, brand, features)

### Technical
- State management (Redux/Zustand)
- API integration
- Image optimization
- SEO optimization
- Performance monitoring
- Testing suite implementation

---

**Total Estimated Development Time**: 60 minutes
**Target Completion**: Fully functional e-commerce browsing experience with clean, professional UI matching the provided Figma designs.
