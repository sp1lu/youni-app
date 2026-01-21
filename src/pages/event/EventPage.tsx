/** Dependencies */
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import EditorJSHTML from 'editorjs-html'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Models */
import { type AppEvent } from '../../features/events'
import { type City } from '../../features/users'

/** Services */
import { getEventById } from '../../features/events'
import { getAllCities, getCityLabel } from '../../features/users'

/** Components */
import { Drawer, Navbar } from '../../global/components'

/** Style */
import './EventPage.scss'

/** Component */
function EventPage() {
    /** Params */
    const { id } = useParams();

    /** Contexts */
    const { user, logout } = useAuth();

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

    return (
        <div className='page event-page'>
            {
                !event ?
                    '' :
                    <div>
                        <div className='page-header'>
                            <Link to='/events'>
                                <div className='back-btn'>
                                    <span className='back-btn__icon'></span>
                                </div>
                            </Link>
                            <p className='header-title'>
                                {
                                    cities ? `${getCityLabel(event.city, cities)} ∙ Evento` : 'Evento'
                                }
                            </p>
                            <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
                            </Drawer>
                        </div>

                        <div className='event-body'>
                            <img src={event.img} alt='Immagine della convenzione' className='event-img' />
                            <div className='event-title__wrapper'>
                                <h2 className='event-title'>{event.title}</h2>
                                <p className='event-desc subtitle-xs'>{event.desc}</p>
                            </div>
                            <div className='divider'></div>
                            <h2>Descrizione Evento</h2>
                            <div dangerouslySetInnerHTML={{ __html: editorjsParser.parse(event.content) }}></div>
                            <div className='divider'></div>
                            <div className='event-info'>
                                <h2>Dove e quando</h2>
                                <div className='event-contacts'>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${event.address}`} target='_blank' className='event-contact'>
                                        <span className='event-contact__icon event-contact__address-icon'></span>
                                        {event.address}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default EventPage
