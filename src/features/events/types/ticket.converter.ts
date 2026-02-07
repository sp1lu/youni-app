/** Dependencies */
import { Timestamp, type DocumentData, type DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { Ticket } from './ticket.interface'

/** Converter */
export const ticketConverter = {
    toFirestore: (ticket: Ticket) => {
        const { id, validatedAt, ...rest } = ticket;
        return {
            ...rest,
            ...(validatedAt && {
                validatedAt: Timestamp.fromDate(validatedAt)
            })
        };
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