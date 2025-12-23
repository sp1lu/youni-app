/** Dependencies */
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, QueryDocumentSnapshot, setDoc } from 'firebase/firestore'

/** Services */
import { db } from '../../../global/services'

/** Types */
import { eventConverter, type AppEvent } from '../types'

/** Methods */
export async function addEvent(data: AppEvent): Promise<void> {
    try {
        await addDoc(collection(db, 'events').withConverter(eventConverter), {
            ...data
        })
            .catch(() => {
                throw new Error('Errore nel salvataggio dell\'evento.');
            })
    } catch (error) {
        throw new Error('Errore nel salvataggio dell\'evento.');
    }
}

export async function updateEvent(data: AppEvent): Promise<void> {
    const { id, ...event } = data;
    try {
        const docRef = doc(db, 'events', id).withConverter(eventConverter);
        await setDoc(docRef, event);
    } catch (error) {
        throw new Error('Errore nel salvataggio dell\'evento.');
    }
}

export async function getAllEvents(): Promise<AppEvent[]> {
    const q = query(collection(db, 'events')).withConverter(eventConverter);
    const events: AppEvent[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<AppEvent | null>) => {
            const e: AppEvent | null = doc.data();
            if (e) events.push(e);
        })
    } catch (error) {
        throw new Error('Errore nel recupero degli eventi.');
    }

    return events;
}

export async function getEventById(id: string): Promise<AppEvent | null> {
    try {
        const docRef = doc(db, 'events', id).withConverter(eventConverter);
        const docSnap = await getDoc(docRef);
        const discount = docSnap.data() ?? null;
        return discount
    } catch (error) {
        throw error instanceof Error ?
            error :
            new Error('Errore nel recupero dell\'evento.');
    }
}

export async function deleteEventById(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'events', id));
    } catch (error) {
        throw new Error('Errore nell\'eliminazione dell\'evento.');
    }
}

export const eventFormdataConverter = {
    toFormdata: (event: AppEvent): Record<string, any> => {
        return {
            title: event.title,
            desc: event.desc,
            img: event.img,
            date: event.date.toISOString().slice(0, 10),
            time: event.time,
            address: event.address,
            video: event.video,
            isFeatured: event.isFeatured,
            maxSeats: event.maxSeats.toString(),
            price: event.price.toString(),
            city: event.city,
            categories: [...event.categories]
        }
    },
    toEvent: (formdata: Record<string, any>): Omit<AppEvent, 'id' | 'content'> => {
        return {
            title: formdata['title'] ?? '',
            desc: formdata['desc'] ?? '',
            img: formdata['img'] ?? '',
            date: formdata['date'] ? new Date(formdata['date']) : new Date(),
            time: formdata['time'] ?? '',
            address: formdata['address'] ?? '',
            video: formdata['video'] ?? '',
            isFeatured: Boolean(formdata['isFeatured']) ?? false,
            maxSeats: formdata['maxSeats'] ? parseFloat(formdata['maxSeats']) : -1,
            price: formdata['price'] ? parseFloat(formdata['price']) : 0.00,
            city: formdata['city'],
            categories: formdata['categories'] ?? []
        }
    }
}