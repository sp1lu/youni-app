/** Dependencies */
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router';

/** Contexts */
import { useAuth } from '../contexts/auth.context'

/** Types */
import type { UserRole } from '../../users'
type ProtectedRouteProps = PropsWithChildren<{
    allowedRoles?: UserRole[];
}>

/** Styles */
import './ProtectedRoute.scss'

/** Component */
function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
    const { baseUser, user, loading } = useAuth();

    if (loading) {
        return (
            <div className='protected-route'>
                <span className='spinner'></span>
                <p>Autenticazione in corso...</p>
            </div>
        );
    }

    if (!baseUser) return <Navigate to='/login' replace />;

    if (!user) return <Navigate to='/signup' replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute