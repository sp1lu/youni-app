/** Dependencies */
import { useEffect, type PropsWithChildren } from 'react'
import { useNavigate } from 'react-router';

/** Contexts */
import { useAuth } from '../contexts/auth.context'

/** Types */
import type { UserRole } from '../../users'
type ProtectedRouteProps = PropsWithChildren<{
    allowedRoles?: UserRole[];
}>

function ProtectedRoute(props: ProtectedRouteProps) {
    const { allowedRoles, children } = props;

    /** Contexts */
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    /** Effects */
    useEffect(() => {
        if (!loading) {
            if (!user) navigate('/landing')
            else if (allowedRoles && !allowedRoles.includes(user.role)) navigate('/')
        }
    }, [user, loading, navigate]);

    if (loading) return (
        <div className='protected-route'>
            <span className='spinner'></span>
            <p>Autenticazione in corso...</p>
        </div>
    )

    /** Node */
    return (
        <>{children}</>
    )
}

export default ProtectedRoute