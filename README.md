# AI Workshop - React App

A modern React application built with Vite, Material-UI, and TanStack Router. This is a front-end only application that uses JSON files for mock data.

## 🚀 Features

- **Modern React**: Built with React 19 and functional components
- **Vite**: Fast development server and build tool
- **Material-UI (MUI)**: Beautiful and accessible UI components
- **TanStack Router**: Type-safe routing solution
- **Mock Data**: JSON files for simulating backend data
- **Responsive Design**: Mobile-first design approach
- **Development Tools**: Hot module replacement and router devtools

## 📦 Tech Stack

- **React** - UI library
- **Vite** - Build tool and development server
- **Material-UI** - UI component library with styled components API
- **TanStack Router** - Client-side routing
- **Emotion** - CSS-in-JS styling (used by MUI)

## 🏗️ Project Structure

```
src/
├── data/           # Mock JSON data files
│   ├── users.json  # User data
│   └── projects.json # Project data
├── routes/         # TanStack Router route definitions
│   ├── __root.jsx  # Root route with theme provider
│   ├── index.jsx   # Home page
│   ├── users.jsx   # Users management page
│   ├── projects.jsx # Projects management page
│   └── dashboard.jsx # Dashboard with analytics
├── main.jsx        # Application entry point
└── router.js       # Router configuration
```

## 🎯 Pages

1. **Home** (`/`) - Landing page with navigation cards
2. **Dashboard** (`/dashboard`) - Analytics and project overview
3. **Users** (`/users`) - Team member management
4. **Projects** (`/projects`) - Project task tracking

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or use this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check for code quality:
```bash
npm run lint
```

## 📊 Mock Data

The application uses JSON files for mock data:

- **users.json**: Contains team member information
- **projects.json**: Contains project tasks and status

You can modify these files to test different scenarios or add new data.

## 🎨 Theming

The application uses Material-UI's theming system. The theme is configured in `src/routes/__root.jsx` and can be customized to match your brand requirements.

## 🛠️ Development Tools

- **Vite DevTools**: Built-in development tools
- **TanStack Router DevTools**: Router debugging (development only)
- **Material-UI**: Component inspector available in browser devtools

## 📱 Responsive Design

The application is built with mobile-first responsive design using Material-UI's breakpoint system. All components are optimized for different screen sizes.

## 🤝 Contributing

This is a workshop project. Feel free to modify and extend it for your learning purposes.

## 📄 License

This project is for educational purposes.
