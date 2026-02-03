/** Dependencies */
import { createBrowserRouter, Outlet, Navigate, type DataRouter } from 'react-router'

/** Services */
import { getAllCities } from './features/users/services'

/** Components */
import App from './App'
import { ProtectedRoute } from './features/auth'

/** Pages */
import { AccountPage, DiscountPage, DiscountsPage, EventPage, EventsPage, FeedPage, LandingPage, SigninPage, SignupPage, UserTicketsPage } from './pages'
import PersonalInfoPage from './pages/personal-info/PersonalInfoPage'
import YouniCardPage from './pages/youni-card/YouniCardPage'

/** Router */
export const router: DataRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to='feed'></Navigate>,

            },
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
            },
            {
                path: 'events',
                element: <ProtectedRoute><Outlet /></ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute><EventsPage /></ProtectedRoute>
                    },
                    {
                        path: ':id',
                        element: <ProtectedRoute><EventPage /></ProtectedRoute>
                    }
                ]
            },
            {
                path: 'discounts',
                element: <ProtectedRoute><Outlet /></ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute><DiscountsPage /></ProtectedRoute>
                    },
                    {
                        path: ':id',
                        element: <ProtectedRoute><DiscountPage></DiscountPage></ProtectedRoute>
                    }
                ]
            },
            {
                path: 'account',
                element: <ProtectedRoute><Outlet /></ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute><AccountPage /></ProtectedRoute>
                    },
                    {
                        path: 'youni-card',
                        element: <ProtectedRoute><YouniCardPage /></ProtectedRoute>
                    },
                    {
                        path: 'personal-info',
                        element: <ProtectedRoute><PersonalInfoPage /></ProtectedRoute>
                    },
                    {
                        path: 'my-tickets',
                        element: <ProtectedRoute><UserTicketsPage /></ProtectedRoute>
                    }
                ]
            }
        ]
    }
]);