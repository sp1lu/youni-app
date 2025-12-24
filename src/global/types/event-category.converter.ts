/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { EventCategory } from './event-category.interface'

/** Converter */
export const eventCatgegoryConverter = {
    toFirestore: (eventCategory: EventCategory) => {
        const { label } = eventCategory;
        return {
            label: label ?? ''
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): EventCategory | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            label: data['label'] ?? snapshot.id
        } as EventCategory : null;
    }
}