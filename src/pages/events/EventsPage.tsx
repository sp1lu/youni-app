/** Dependencies */
import { useEffect, useState } from 'react'

/** Services */
import { formatDate, getAllEventCategories, getEventCategoryLabel } from '../../global/services'
import { getAllEvents } from '../../features/events'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { AppEvent } from '../../features/events'
import type { EventCategory } from '../../global/types'

/** Components */
import { Card, Drawer, Navbar } from '../../global/components'

/** Style */
import './EventsPage.scss'

/** Component */
function EventsPage() {
    /** Contexts */
    const { user, logout } = useAuth();

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

    /** Node */
    return (
        <div className='page events-page'>
            <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>

            <p className='title-s events-title'>Eventi</p>

            <div className='events-list'>
                {
                    events.map((e: AppEvent) => (
                        <Card key={e.id}
                            uid={e.id}
                            img={e.img}
                            text={e.title}
                            desc={formatDate(e.date)}
                            path='discounts'
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
        </div>
    )
}

export default EventsPage