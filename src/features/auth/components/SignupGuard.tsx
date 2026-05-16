/** Dependencies */
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

/** Contexts */
import { useAuth } from '../contexts'

/** Styles */
import './ProtectedRoute.scss'

/** Component */
function SignupGuard({ children }: PropsWithChildren) {
    const { baseUser, user, loading } = useAuth();

    if (loading) {
        return (
            <div className='protected-route'>
                <span className='spinner'></span>
                <p>Caricamento...</p>
            </div>
        );
    }

    if (!baseUser) return <Navigate to='/login' replace />;

    if (user) return <Navigate to='/feed' replace />;

    return <>{children}</>;
}

export default SignupGuard