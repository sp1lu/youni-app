/** Dependencies */
import { collection, getDocs, query, QueryDocumentSnapshot } from 'firebase/firestore'

/** Types */
import { type EventCategory, eventCatgegoryConverter } from '../types'

/** Services */
import { db } from './firebase.service'

/**Methods */
export async function getAllEventCategories(): Promise<EventCategory[]> {
    const q = query(collection(db, 'eventCategories')).withConverter(eventCatgegoryConverter);
    const categories: EventCategory[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<EventCategory | null>) => {
            const category = doc.data();
            if (category) categories.push(category);
        })
    } catch (error) {
        throw new Error('Errore nel recupero delle categories.');
    }

    return categories;
}


export function getEventCategoryLabel(id: string, categories: EventCategory[]): string | undefined {
    return categories.find((C: EventCategory) => C.id === id)?.label ?? undefined;
}