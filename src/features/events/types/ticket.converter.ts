/** Dependencies */
import { Timestamp, type DocumentData, type DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { Ticket } from './ticket.interface'

/** Converter */
export const ticketConverter = {
    toFirestore: (ticket: Ticket) => {
        return {
            ...ticket,
            validatedAt: ticket.validatedAt && Timestamp.fromDate(ticket.validatedAt)
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): Ticket | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            event: data['event'] ?? '',
            user: data['user'] ?? '',
            validatedAt: data['validatedAt'] ? data['validatedAt'].toDate() : undefined
        } : null;
    }
}