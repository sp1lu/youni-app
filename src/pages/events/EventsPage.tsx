/** Dependencies */
import { useEffect, useRef, useState } from 'react'

/** Services */
import { formatDate, getAllEventCategories, getEventCategoryLabel } from '../../global/services'
import { getAllEvents } from '../../features/events'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { AppEvent } from '../../features/events'
import type { EventCategory } from '../../global/types'
import type { ModalHandle } from '../../global/components/modal/Modal'

/** Components */
import { Card, Drawer, Modal, Navbar } from '../../global/components'

/** Style */
import './EventsPage.scss'

/** Component */
function EventsPage() {
    /** Contexts */
    const { user, logout } = useAuth();

    /** Refs */
    const modalRef = useRef<ModalHandle | null>(null);

    /** State */
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

    /** Effects */
    useEffect(() => {
        getAllEvents()
            .then((events: AppEvent[]) => {
                setEvents(events.filter((e) => e.city === user?.city))
            })
            .catch((err: unknown) => err)
    }, [])

    useEffect(() => {
        getAllEventCategories()
            .then((categories: EventCategory[]) => setEventCategories(categories))
            .catch((err: unknown) => err)
    }, [])

    /** Methods */
    const onModalToggleClick = () => {
        modalRef.current?.open();
    }

    /** Node */
    return (
        <div className='page events-page'>
            {/* <div className='page-header'> */}
                <button type='button' className='button tertiary filters-toggle' onClick={onModalToggleClick}>
                    <span className='filters-icon'></span>
                </button>
                <p className='title-s events-title'>Eventi</p>
                <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                    <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
                </Drawer>
            {/* </div> */}

            <div className='events-list'>
                {
                    events.map((e: AppEvent) => (
                        <Card key={e.id}
                            uid={e.id}
                            img={e.img}
                            text={e.title}
                            desc={formatDate(e.date)}
                            path='events'
                            chip={
                                (() => {
                                    const id = e.categories[0];
                                    return id ? getEventCategoryLabel(id, eventCategories) : id;
                                })()
                            }
                        />
                    ))
                }
            </div>

            <Modal ref={modalRef} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} title='Filtri'>
                <p>Modal content</p>
            </Modal>
        </div>
    )
}

export default EventsPage