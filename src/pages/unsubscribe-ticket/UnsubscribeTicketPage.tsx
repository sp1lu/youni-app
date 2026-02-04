/** Dependencies */
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'
import type { AppEvent, Ticket } from '../../features/events'

/** Services */
import { deleteTicketById, getEventById, getTicketBydId } from '../../features/events'

/** Components */
import { Drawer, Header, Navbar } from '../../global/components'

/** Style */
import './UnsubscribeTicketPage.scss'

/** Component */
function UnsubscribeTicketPage() {
    /** Navigate */
    const navigate = useNavigate();

    /** Params */
    const { id } = useParams();

    /** Contexts */
    const { user, logout } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** State */
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [appEvent, setAppEvent] = useState<AppEvent | null>(null);

    /** Effects */
    useEffect(() => {
        if (!id) {
            navigate('/account/my-tickets');
            return;
        }

        getTicketBydId(id)
            .then((ticket: Ticket | null) => setTicket(ticket))

        getEventById(id)
            .then((event: AppEvent | null) => setAppEvent(event))
    }, [id]);

    useEffect(() => {
        if (!ticket) return;
        getEventById(ticket.event)
            .then((event: AppEvent | null) => setAppEvent(event))

    }, [ticket])

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    const onConfirmBtnClick = (): void => {
        if (!id || !ticket) return;

        deleteTicketById(ticket.id)
            .then(() => {
                navigate('/account/my-tickets');
            })
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nella disiscrizione all'evento.`, 'ERROR'))
    }

    /** Node */
    return (
        <div className='page unsubscribe-page'>
            <Header text='Conferma annullamento' style={{ fontWeight: 700, textAlign: 'center' }}>
                <Header.Left>
                    <Link to={`/account/my-tickets/${id}`}>
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

            <div className='unsubscribe-content'>
                {
                    appEvent &&
                    <div className='unsubscribe'>
                        <p>Stai per annullare la tua partecipazione all'evento</p>
                        <h3>{appEvent.title}</h3>
                        <p>Sicuro di voler proseguire?</p>
                    </div>
                }

                {
                    appEvent && <div className='confirm'><button type='button' className='secondary confirm-btn' onClick={onConfirmBtnClick}>Sì, annulla partecipazione</button></div>
                }
            </div>
        </div>
    )
}

export default UnsubscribeTicketPage