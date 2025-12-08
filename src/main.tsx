/** Dependencies */
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

/** Providers */
import { AuthProvider } from './features/auth/contexts/auth.context.tsx'

/** Router */
import { router } from './router.tsx'

/** Components */
import App from './App.tsx'

/** Styles */
import './index.scss'

/** Root */
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
  // </StrictMode>,
)