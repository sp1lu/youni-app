/** Dependencies */
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, QueryDocumentSnapshot, setDoc, where } from 'firebase/firestore'

/** Services */
import { db } from '../../../global/services'

/** Types */
import { ticketConverter, type Ticket } from '../types'

/** Methods */
export async function addTicket(data: Ticket): Promise<string> {
    try {
        const docRef = await addDoc(
            collection(db, 'tickets').withConverter(ticketConverter),
            { ...data }
        );
        return docRef.id;
    } catch (error) {
        throw new Error('Errore nel salvataggio del biglietto.');
    }
}

export async function getTicketsByEvent(eventId: string): Promise <Ticket[]> {
    const q = query(collection(db, 'tickets'), where('event', '==', eventId)).withConverter(ticketConverter);
    const tickets: Ticket[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<Ticket | null>) => {
            const e: Ticket | null = doc.data();
            if (e) tickets.push(e);
        })
    } catch(error) {
        throw new Error('Errore nel recupero degi biglietti.');
    }
    
        return tickets;
}

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

export async function getTicketsByUser(userId: string): Promise<Ticket[]> {
    try {
        const docRef = collection(db, 'tickets').withConverter(ticketConverter);
        const q = query(docRef, where('user', '==', userId));
        const docSnap = await getDocs(q);
        return docSnap.docs.map((t) => t.data()).filter((t) => t !== null);
    } catch (error) {
        throw error instanceof Error ?
            error :
            new Error('Errore nel recupero dei biglietti.');
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

export async function deleteTicketById(id: string): Promise<void> {
    try {
        const docRef = doc(db, 'tickets', id);
        await deleteDoc(docRef)
    } catch (error) {
        throw new Error(`Errore nella disiscrizione all'evento.`);

    }
}