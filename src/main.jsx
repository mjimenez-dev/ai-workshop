import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import './index.css'
import { router, RouterProvider } from './router.js'
import theme from './theme/index.js'
import performanceTest from './utils/performance.js'

// Start performance monitoring in development
if (import.meta.env.DEV) {
  performanceTest.runAllTests();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
