/** Dependencies */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import EditorJSHTML from 'editorjs-html'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Models */
import { type AppEvent } from '../../features/events'
import { type City } from '../../features/users'
import { type DrawerHandle } from '../../global/components/drawer/Drawer'

/** Services */
import { getEventById } from '../../features/events'
import { getAllCities, getCityLabel } from '../../features/users'

/** Components */
import { Drawer, Header, Navbar } from '../../global/components'

/** Style */
import './EventPage.scss'

/** Component */
function EventPage() {
    /** Params */
    const { id } = useParams();

    /** Contexts */
    const { user, logout } = useAuth();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** Memo */
    const editorjsParser = useMemo(() => EditorJSHTML(), []);

    /** State */
    const [event, setEvent] = useState<AppEvent | null>(null);
    const [cities, setCities] = useState<City[]>([]);

    /** Effects */
    useEffect(() => {
        if (!id) return;
        getEventById(id)
            .then((event: AppEvent | null) => {
                setEvent(event);
            })
    }, []);

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
        <div className='page event-page'>
            <Header text={cities && event ? `${getCityLabel(event.city, cities)} ∙ Convenzione` : 'Convenzione'} style={{ fontWeight: 700, textAlign: 'center' }}>
                <Header.Left>
                    <Link to='/events'>
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
                !event ?
                    '' :
                    <div>
                        <div className='event-body'>
                            <img src={event.img} alt='Immagine della convenzione' className='event-img' />
                            <div className='event-title-wrapper'>
                                <h2 className='event-title'>{event.title}</h2>
                                <p className='event-desc subtitle-xs'>{event.desc}</p>
                            </div>
                            <div className='divider'></div>
                            <div className='event-infos'>
                                <h2>Dove e quando</h2>
                                <div className='event-infos__content'>
                                    <div className='event-time'>
                                        <span className='event-info__icon event-info__time-icon'></span>
                                        <div className='event-time__details'>
                                            <p className='event-info__primary'>{new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' }).format(event.date)}</p>
                                            <p className='event-info__secondary'>{event.time}</p>
                                        </div>
                                    </div>

                                    <a href={`https://www.google.com/maps/search/?api=1&query=${event.address}`} target='_blank' className='event-info event-info__primary'>
                                        <span className='event-info__icon event-info__address-icon'></span>
                                        {event.address}
                                    </a>
                                </div>
                            </div>
                            <div className='divider'></div>
                            <h2>Descrizione Evento</h2>
                            <div dangerouslySetInnerHTML={{ __html: editorjsParser.parse(event.content) }}></div>
                            <div className='divider'></div>
                            <div className='video-wrapper'>
                                <iframe src={`https://www.youtube.com/embed/${event.video}`} className='video' title={event.title} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
                            </div>

                            <div className='event-cta'>
                                {
                                    event.price === 0 ?
                                        <p className='event-price'>Gratuito</p> :
                                        <p className='event-price'>Da {event.price.toFixed(2)}€ <span className='event-price--person'>/ a testa</span></p>
                                }
                                <button type='button' className='primary'>Partecipa</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default EventPage
