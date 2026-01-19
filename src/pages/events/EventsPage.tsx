/** Dependencies */
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

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
    const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<AppEvent[]>([]);
    const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
    const [filterForm, setFilterForm] = useState<Record<string, boolean>>({});

    /** Effects */
    useEffect(() => {
        setIsLoadingEvents(true);
        getAllEvents()
            .then((events: AppEvent[]) => {
                setEvents(events.filter((e) => e.city === user?.city))
                setFilteredEvents(events.filter((e) => e.city === user?.city))
            })
            .catch((err: unknown) => err)
            .finally(() => setIsLoadingEvents(false));
    }, [])

    useEffect(() => {
        getAllEventCategories()
            .then((categories: EventCategory[]) => setEventCategories(categories))
            .catch((err: unknown) => err)
    }, [])

    /** Methods */
    const onModalToggleClick = (): void => {
        modalRef.current?.open();
    }

    const onInpuChange = (event: ChangeEvent, id: string): void => {
        const input = event.target as HTMLInputElement;
        const value: boolean = input.checked;

        setFilterForm((prevValue) => {
            return {
                ...prevValue,
                [id]: value
            }
        })
    }

    const onFormSubmit = (formEvent: FormEvent): void => {
        formEvent.preventDefault();
        const keys: Set<string> = new Set(
            Object.entries(filterForm)
                .filter(([_, v]: [string, boolean]) => v)
                .map(([k, _]: [string, boolean]) => k)
        );

        setFilteredEvents(
            keys.size === 0 ?
                events :
                events.filter((event: AppEvent) => event.categories.some(c => keys.has(c)))
        );

        modalRef.current?.close();
    }

    /** Node */
    return (
        <div className='page events-page'>
            <button type='button' className='button tertiary filters-toggle' onClick={onModalToggleClick}>
                <span className='filters-icon'></span>
            </button>
            <p className='title-s events-title'>Eventi</p>
            <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>

            {
                isLoadingEvents ?
                    <p className='events-list__empty'>Caricamento eventi in corso...</p> :
                    <div className='events-list'>
                        {
                            filteredEvents.length > 0 ?
                                filteredEvents.map((e: AppEvent) => (
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
                                )) :
                                <p className='events-list__empty'>Nessun evento trovato per criteri impostati</p>
                        }
                    </div>
            }

            <Modal ref={modalRef} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} title='Filtri'>
                <form className='filter-form' onSubmit={onFormSubmit}>
                    <div className='filter-form__category'>
                        <p className='filter-form__category-name subtitle-xs'>Tipologia di evento</p>
                        <div className='filter-form__radio'>
                            {
                                eventCategories.map((c: EventCategory) => (
                                    <label key={c.id} className='chip'>
                                        <input type='checkbox' name='event-category' checked={!!filterForm[c.id]} onChange={(e) => onInpuChange(e, c.id)} />
                                        {c.label}
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <button type='submit' className='primary'>Mostra risultati</button>
                </form>
            </Modal>
        </div>
    )
}

export default EventsPage