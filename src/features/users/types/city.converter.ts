/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { City } from './city.type'

/** Converter */
export const cityConverter = {
    toFirestore: (city: City) => {
        const { label, url, links } = city;
        return {
            label: label ?? '',
            url: url ?? '',
            links: links ?? new Map()
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): City | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            label: data['label'] ?? snapshot.id,
            url: data['url'] ?? '',
            links: data['links'] ? new Map<string, string>(Object.entries(data['links'])) : undefined
        } as City : null;
    }
}