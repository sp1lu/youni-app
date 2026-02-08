/** Dependencies */
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Types */
import type { AppEvent } from '../../features/events'
import type { DrawerHandle } from '../../global/components/drawer/Drawer'

/** Services */
import { addTicket, getEventById } from '../../features/events'

/** Components */
import { Drawer, Header, Navbar } from '../../global/components'

/** Style */
import './EventSubscribePage.scss'

/** Component */
function EventSubscribePage() {
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
    const [appEvent, setAppEvent] = useState<AppEvent | null>(null);


    /** Effects */
    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }

        getEventById(id)
            .then((event: AppEvent | null) => setAppEvent(event))
    }, [id])

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    const onSubscribeBtnClick = () => {
        if (!appEvent || !user) return;
        if (appEvent.price > 0) return;
        addTicket({ id: '', user: user.id, event: appEvent.id })
            .then((ticketId: string) => navigate('../success', { state: { ticketId } }))
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nella creazione del tuo biglietto. Riprovare.`, 'ERROR'))
    }

    /** Node */
    return (
        <div className='page subscribe-event-page'>
            <Header text='Iscrizione evento' style={{ fontWeight: 700, textAlign: 'center' }}>
                <Header.Left>
                    <Link to={`/events/${id}`}>
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

            {
                appEvent &&
                <div className='subscribe-event-page-body'>
                    <img src={appEvent.img} alt='Immagine della convenzione' className='event-img' />
                    <div className='event-title-wrapper'>
                        <h2 className='event-title'>{appEvent.title}</h2>
                        <p className='event-desc subtitle-xs'>{new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(appEvent.date)} | {appEvent.time}</p>
                    </div>

                    <div className='divider'></div>

                    <div className='price-wrapper'>
                        <p>1 x biglietto</p>
                        <p>{appEvent.price === 0 ? 'GRATUITO' : `${appEvent.price.toFixed(2)}€`}</p>
                    </div>

                    <div className='divider'></div>

                    <div className='price-wrapper total-price'>
                        <p>Totale</p>
                        <p>{appEvent.price === 0 ? 'GRATUITO' : `${appEvent.price.toFixed(2)}€`}</p>
                    </div>

                    <button type='button' className='primary subscribe-event-btn' onClick={onSubscribeBtnClick}>
                        {
                            appEvent.price === 0 ? 'Conferma partecipazione' : 'Continua con Stripe'
                        }
                    </button>
                </div>
            }
        </div>
    )
}

export default EventSubscribePage