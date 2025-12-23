/** Dependencies */
import { Timestamp, type DocumentData, type DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { AppEvent } from './event.interface'

/** Converter */
export const eventConverter = {
    toFirestore: (appEvent: AppEvent) => {
        return {
            ...appEvent,
            date: Timestamp.fromDate(appEvent.date)
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): AppEvent | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            address: data['address'] ?? '',
            content: data['content'] ?? { block: [] },
            date: data['date'].toDate() ?? new Date(),
            desc: data['desc'] ?? '',
            img: data['img'] ?? '',
            time: data['time'] ?? '',
            title: data['title'] ?? '',
            video: data['video'] ?? '',
            isFeatured: data['isFeatured'] ?? false,
            maxSeats: data['maxSeats'] ? parseFloat(data['maxSeats']) : -1,
            price: data['price'] ? parseFloat(data['price']) : 0.00,
            city: data['city'] ?? 'genova',
            categories: data['categories'] ?? []
        } : null;
    }
}