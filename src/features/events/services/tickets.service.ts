/** Dependencies */
import { doc, getDoc, setDoc } from 'firebase/firestore'

/** Services */
import { db } from '../../../global/services'

/** Types */
import { ticketConverter, type Ticket } from '../types'

/** Methods */
export async function getTicketBydId(id: string): Promise<Ticket | null> {
    try {
        const docRef = doc(db, 'tickets', id).withConverter(ticketConverter);
        const docSnap = await getDoc(docRef);
        const ticket = docSnap.data() ?? null;      
        return ticket;
    } catch (error) {
        throw error instanceof Error ?
            error :
            new Error('Errore nel recupero del biglietto.');
    }
}

export async function updateTicket(data: Ticket): Promise<void> {
    const { id, ...ticket } = data;
    try {
        const docRef = doc(db, 'tickets', id).withConverter(ticketConverter);
        await setDoc(docRef, ticket);
    } catch (error) {
        throw new Error(`Errore nel salvataggio del biglietto.`);        
    }
}