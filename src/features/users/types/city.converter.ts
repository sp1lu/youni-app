/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { City } from './city.type'

/** Converter */
export const cityConverter = {
    toFirestore: (city: City) => {
        const { label } = city;
        return {
            label: label ?? ''
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): City | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            label: data['label'] ?? snapshot.id
        } as City : null;
    }
}