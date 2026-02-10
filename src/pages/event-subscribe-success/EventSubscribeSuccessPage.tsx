/** Dependencies */
import { Link, useLocation, useParams } from 'react-router'

/** Types */
import type { AppEvent, Ticket } from '../../features/events'

/** Services */
import { getEventById, getTicketBydId } from '../../features/events'

/** Components */
import { PWABanner } from '../../features/pwa'
import { Header } from '../../global/components'

/** Style */
import './EventSubscribeSuccessPage.scss'
import { useEffect, useState } from 'react';

/** Component */
function EventSubscribeSuccessPage() {
    /** Params */
    const { id } = useParams();

    /** Location */
    const { state } = useLocation();

    /** State */
    const [event, setEvent] = useState<AppEvent | null>(null);
    const [ticket, setTicket] = useState<Ticket | null>(null);

    /** Effects */
    useEffect(() => {
        if (!id) return;
        getEventById(id)
            .then((event: AppEvent | null) => setEvent(event))
    }, [id]);

    useEffect(() => {
        if (!state || !('ticketId' in state)) return;        
        getTicketBydId(state.ticketId)
            .then((ticket: Ticket | null) => setTicket(ticket))
    }, [state])

    /** Node */
    return (
        <div className='page subscribe-event-success-page'>
            <Header text='Conferma partecipazione' style={{ fontWeight: 700, textAlign: 'center' }}></Header>
            <PWABanner />
            {
                event &&
                <div className='subscribe-event-success-page-body'>
                    <div className='subscribe-event-success-infos'>
                        <div className='confirmed'>
                            <div className='confirm__icon-wrapper'>
                                <span className='confirmed__icon'></span>
                            </div>
                            <div className='confirmed__texts'>
                                <h3 className='confirmed__title'>Pagamento confermato</h3>
                                <p className='confirmed__msg'>Non vediamo l'ora tu sia dei nostri!</p>
                            </div>
                        </div>

                        <div className='divider'></div>

                        <div className='event-info'>
                            <h2 className='event-info__title'>{event.title}</h2>
                            <p className='event-info__date'>{new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).format(event.date)} | {event.time}</p>
                        </div>

                        <div className='divider'></div>
                    </div>
                    <div className='subscribe-event-success-cta'>
                        <Link to={ticket ? `/account/my-tickets/${ticket.id}` : `/account/my-tickets`} className='button primary'>{ticket ? 'Vedi biglietto digitale' : 'Vai ai tuoi biglietti'}</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default EventSubscribeSuccessPage