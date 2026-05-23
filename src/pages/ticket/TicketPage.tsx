/** Dependencies */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer';
import type { AppEvent, Ticket } from '../../features/events'
import type { City } from '../../features/users';

/** Services */
import { getAllCities, getCityLabel } from '../../features/users';
import { getEventById, getTicketBydId } from '../../features/events'

/** Components */
import { PWABanner } from '../../features/pwa';
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
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [appEvent, setAppEvent] = useState<AppEvent | null>(null);
    const [cities, setCities] = useState<City[]>([]);

    /** Effects */
    useEffect(() => {
        if (!id) {
            navigate('/account/my-tickets');
            return;
        }

        getTicketBydId(id)
            .then((ticket: Ticket | null) => setTicket(ticket))

    }, [id]);

    useEffect(() => {
        if (!ticket) return;
        getEventById(ticket.event)
            .then((event: AppEvent | null) => setAppEvent(event))

    }, [ticket])

    useEffect(() => {
        getAllCities()
            .then((cities: City[]) => {
                setCities(cities);
            })
    }, []);

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    /** Node */
    return (
        <div className='page ticket-page'>
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
            <PWABanner closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} />
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} externalUrlsMap={cities.find((c) => c.id === user?.city)?.links} onLogout={logout} />
            </Drawer>

            <div className='ticket-page__content'>
                {
                    appEvent ?
                        <div className='ticket-infos'>
                            <div className='qrcode-wrapper'>
                                <QRCodeCanvas url={`${import.meta.env.VITE_ADMIN_URL}/#/check/ticket/${id}`}></QRCodeCanvas>
                            </div>
                            <div className='divider divider--dashed'></div>

                            <div className='ticket-info'>
                                <p className='ticket-label'>{getCityLabel(appEvent.city, cities)}</p>
                                <p className='ticket-data'>{appEvent.title}</p>
                            </div>

                            <div className='divider'></div>

                            <div className='ticket-info'>
                                <div className='ticket-line'>
                                    <p className='ticket-label'>Data</p>
                                    <p className='ticket-label'>Ora</p>
                                </div>

                                <div className='ticket-line'>
                                    <p className='ticket-data'>{new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(appEvent.date)}</p>
                                    <p className='ticket-data'>{appEvent.time}</p>
                                </div>
                            </div>

                            <div className='ticket-info'>
                                <p className='ticket-label'>Dove</p>
                                <p className='ticket-data'>{appEvent.address}</p>
                            </div>
                        </div>
                        : ''

                }
                {
                    appEvent && <div className='unsubscribe'><Link to='unsubscribe' className='unsubscribe-btn'>Disiscriviti</Link></div>
                }
            </div>
        </div>
    )
}

export default TicketPage