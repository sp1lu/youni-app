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

/** Styles */
import './ProtectedRoute.scss'

/** Component */
function ProtectedRoute(props: ProtectedRouteProps) {
    const { allowedRoles, children } = props;

    /** Contexts */
    const { baseUser, user, loading } = useAuth();
    const navigate = useNavigate();

    /** Effects */
    useEffect(() => {
        console.log(baseUser, user, loading);        
        if (loading) return;

        if (!baseUser) {
            console.log('1');
            navigate('/landing')
        }
        else if (!user) {
            console.log('2');
            navigate('/signup')
        }
        else if (allowedRoles && !allowedRoles.includes(user.role)) {
            console.log('3');
            navigate('/')
        }
    }, [baseUser, user, loading]);

    if (loading) {
        console.log('loggin in...');        
        return (
            <div className='protected-route'>
                <span className='spinner'></span>
                <p>Autenticazione in corso...</p>
            </div>
        )
    }

    /** Node */
    console.log('YEEEEE');    
    return (
        <>{children}</>
    )
}

export default ProtectedRoute