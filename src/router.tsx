/** Dependencies */
import { createBrowserRouter, type DataRouter } from 'react-router'

/** Services */
import { getAllCities } from './features/users/services'

/** Components */
import App from './App'

/** Pages */
import { LandingPage, SignupPage } from './pages'

/** Router */
export const router: DataRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'landing', element: <LandingPage /> },
            {
                path: 'signup',
                element: <SignupPage />,
                loader: async () => {
                    return {
                        cities: await getAllCities()
                    }
                }
            }
        ]
    }
]);