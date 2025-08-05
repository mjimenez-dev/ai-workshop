import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router, RouterProvider } from './router.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
