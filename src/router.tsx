/** Dependencies */
import { createBrowserRouter, type DataRouter } from 'react-router'

/** Services */
import { getAllCities } from './features/users/services'

/** Components */
import App from './App'
import { ProtectedRoute } from './features/auth'

/** Pages */
import { FeedPage, LandingPage, SigninPage, SignupPage } from './pages'

/** Router */
export const router: DataRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <ProtectedRoute><p>SONO LA HOME FUTURA</p></ProtectedRoute> },
            { path: 'landing', element: <LandingPage /> },
            { path: 'signin', element: <SigninPage /> },
            {
                path: 'signup',
                element: <ProtectedRoute><SignupPage /></ProtectedRoute>,
                loader: async () => {
                    return {
                        cities: await getAllCities()
                    }
                }
            },
            {
                path: 'feed',
                element: <ProtectedRoute><FeedPage /></ProtectedRoute>
            }
        ]
    }
]);