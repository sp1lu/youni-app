/** Dependencies */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer';
import type { AppEvent, Ticket } from '../../features/events'

/** Services */
import { getEventById, getTicketBydId } from '../../features/events'

/** Components */
import Drawer from '../../global/components/drawer/Drawer';
import { Header, Navbar, QRCodeCanvas } from '../../global/components';

/** Style */
import './TicketPage.scss'

/** Component */
function TicketPage() {
    /** Navigate */
    const navigate = useNavigate();

    /** Params */
    const { id } = useParams();

    /** Contexts */
    const { user, logout } = useAuth();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** State */
    const [appEvent, setAppEvent] = useState<AppEvent | null>(null);

    /** Effects */
    useEffect(() => {
        if (!id) {
            navigate('/account/my-tickets');
            return;
        }
        getEventById(id)
            .then((event: AppEvent | null) => setAppEvent(event))
    }, []);

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    /** Node */
    return (
        <div className='page'>
            <Header text='Biglietto' style={{ fontWeight: 700, textAlign: 'center' }}>
                <Header.Left>
                    <Link to='/account/my-tickets'>
                        <div className='back-btn'>
                            <span className='back-btn__icon'></span>
                        </div>
                    </Link>
                </Header.Left>
                <Header.Right>
                    <button type='button' className='drawer-toggle tertiary' onClick={onDrawerToggleClick}>
                        <span className='drawer-toggle__icon'></span>
                    </button>
                </Header.Right>
            </Header>
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>

            <div>
                {
                    appEvent ?
                        <div>
                            <p>{appEvent.city}</p>
                            <p>{appEvent.title}</p>
                            <p>Data</p>
                            <p>{new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(appEvent.date)}</p>
                            <p>ora</p>
                            <p>{appEvent.time}</p>
                            <p>Dove</p>
                            <p>{appEvent.address}</p>
                        </div>
                        : ''

                }
            </div>
        </div>
    )
}

export default TicketPage