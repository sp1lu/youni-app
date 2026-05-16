/** Dependencies */
import { Outlet, Navigate, type DataRouter, createHashRouter } from 'react-router'

/** Services */
import { getAllCities } from './features/users/services'

/** Components */
import App from './App'
import { ProtectedRoute } from './features/auth'

/** Pages */
import { AccountPage, DiscountPage, DiscountsPage, EventPage, EventsPage, EventSubscribePage, EventSubscribeSuccessPage, FeedPage, LandingPage, PersonalInfoPage, ResetPassword, SigninPage, SignupPage, StripeCancelPage, StripeSuccessPage, TicketPage, UnsubscribeTicketPage, UserTicketsPage, YouniCardPage, DeleteAccountPage } from './pages'

/** Router */
export const router: DataRouter = createHashRouter([
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
            { path: 'reset-password', element: <ResetPassword />},
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
                        children: [
                            {
                                index: true,
                                element: <ProtectedRoute><EventPage /></ProtectedRoute>
                            },
                            {
                                path: 'subscribe',
                                element: <ProtectedRoute><EventSubscribePage /></ProtectedRoute>
                            },
                            {
                                path: 'success',
                                element: <ProtectedRoute><EventSubscribeSuccessPage /></ProtectedRoute>
                            }
                        ]
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
                        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
                        children: [
                            {
                                index: true,
                                element: <ProtectedRoute><UserTicketsPage /></ProtectedRoute>,
                            },
                            {
                                path: ':id',
                                element: <ProtectedRoute><TicketPage /></ProtectedRoute>
                            },
                            {
                                path: ':id/unsubscribe',
                                element: <ProtectedRoute><UnsubscribeTicketPage /></ProtectedRoute>
                            }
                        ]
                    },
                    {
                        path: 'delete-account',
                        element: <ProtectedRoute><DeleteAccountPage /></ProtectedRoute>
                    }
                ]
            },
            { path: 'success', element: <ProtectedRoute><StripeSuccessPage /></ProtectedRoute> },
            { path: 'cancel', element: <ProtectedRoute><StripeCancelPage /></ProtectedRoute> }
        ]
    }
]);