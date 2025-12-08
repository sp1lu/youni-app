/** Dependencies */
import { createBrowserRouter, type DataRouter } from 'react-router'

/** Components */
import App from './App'
import { LandingPage } from './pages'

/** Router */
export const router: DataRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'landing', element: <LandingPage /> }
        ]
    }
]);