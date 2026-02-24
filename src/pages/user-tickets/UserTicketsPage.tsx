/** Dependencies */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'
import type { Ticket } from '../../features/events'
import type { AppEvent } from '../../features/events'
import type { City } from '../../features/users'

/** Services */
import { getEventById, getTicketsByUser } from '../../features/events'
import { getAllCities } from '../../features/users'

/** Components */
import { PWABanner } from '../../features/pwa'
import { Drawer, Header, Navbar } from '../../global/components'

/** Style */
import './UserTicketsPage.scss'

/** Component */
function UserTicketsPage() {
    /** Contexts */
    const { user, logout } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** State */
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

    /** Effects */
    useEffect(() => {
        if (!user) return;
        getAllCities()
            .then((cities: City[]) => setCities(cities))
            .catch((err: unknown) => console.log(err))
    }, [user])

    useEffect(() => {
        if (!user) return;

        setIsLoading(true);
        getTicketsByUser(user.id)
            .then((tickets: Ticket[]) => {
                setTickets(tickets);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [user]);

    useEffect(() => {
        if (tickets.length === 0) return;

        setIsLoading(true);
        const eventsPromises: Promise<AppEvent | null>[] = tickets.map(ticket =>
            getEventById(ticket.event)
        );

        Promise.all(eventsPromises)
            .then((events: (AppEvent | null)[]) => {
                setAppEvents(events.filter((e) => e !== null).sort((a, b) => b.date.getTime() - a.date.getTime()));
            })
            .catch((err: unknown) => {
                createSnackbar(err instanceof Error ? err.message : `Errore nel recupero dei tuoi biglietti.`, 'ERROR')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [tickets]);

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    /** Node */
    return (
        <div className='page my-tickets-page'>
            <Header text='I miei eventi' style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' }}>
                <Header.Left>
                    <Link to='/account'>
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
            <PWABanner />
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} externalUrlsMap={cities.find((c) => c.id === user?.city)?.links} onLogout={logout} />
            </Drawer>

            <div className='tickets-list'>
                {
                    isLoading ?
                        <div className='tickets-loader'>
                            <span className='spinner'></span>
                        </div> :
                        appEvents.length > 0 ?
                            appEvents.map((event: AppEvent, i: number) => (
                                <Link to={`./${tickets[i].id}`} className='ticket' key={event.id}>
                                    <p className='ticket__title subtitle-xs'>{event.title}</p>
                                    <p className='ticket__date'>{new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(event.date)}</p>
                                </Link>
                            )) :
                            <p className='empty-list'>Non sei ancora registrato a nessun evento!</p>
                }
            </div>
        </div>
    )
}

export default UserTicketsPage