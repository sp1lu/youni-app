/** Dependencies */
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

/** Providers */
import { AuthProvider } from './features/auth/contexts/auth.context.tsx'
import { PWAProvider } from './features/pwa/index.ts'
import { SnackbarProvider } from './features/snackbars/index.ts'

/** Components */
import SnackbarContainer from './features/snackbars/components/SnackbarContainer.tsx'

/** Router */
import { router } from './router.tsx'

/** Styles */
import './index.scss'

/** Root */
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <PWAProvider>
      <SnackbarProvider>
        <SnackbarContainer />
        <RouterProvider router={router} />
      </SnackbarProvider>
    </PWAProvider>
  </AuthProvider>
)