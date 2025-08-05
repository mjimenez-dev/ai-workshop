# Copilot Instructions

Always conform to the project details defined in the files located at /ai-workshop/ai-docs when providing answers and generating code.

## Project Overview
This is a React application built with:
- **Vite** as the build tool
- **Material-UI (MUI)** for UI components and theming
- **TanStack Router** for client-side routing
- **ES Modules** (the project uses modern ES module syntax)
- **JSON files** for mock data (no backend connection)

## Development Guidelines
- Use ES6+ syntax and import/export statements
- Prefer MUI components and follow Material Design principles
- Use MUI's styled components API for custom styling instead of sx prop
- Use TanStack Router for all navigation and routing
- Keep mock data in JSON files under `/src/data/` directory
- Follow React functional components with hooks
- Use MUI's theming system for consistent styling
- Implement responsive design using MUI's breakpoint system

## Project Structure
- `src/routes/` - TanStack Router route definitions
- `src/data/` - Mock JSON data files
- `src/main.jsx` - Application entry point with router setup
- `src/router.js` - Router configuration

## Code Style
- Use arrow functions for components
- Use MUI's styled() function for component styling
- Implement proper error boundaries
- Follow Material Design spacing and color guidelines
- Keep components modular and reusable
- Use ES6 imports for all dependencies

## Available Routes
- `/` - Home page with navigation cards
- `/dashboard` - Analytics and overview
- `/users` - User management page
- `/projects` - Project management page

## Mock Data Files
- `users.json` - Team member data
- `projects.json` - Project task data
