/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { Discount } from './discount.interface'

/** Converter */
export const discountConverter = {
    toFirestore: (discount: Discount) => {
        return {
            ...discount
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): Discount | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            address: data['address'] ?? '',
            color: data['color'] ?? '#00F261',
            content: data['content'] ?? { blocks: [] },
            discount: data['discount'] ?? '',
            email: data['email'] ?? '',
            img: data['img'] ?? '',
            phone: data['phone'] ?? '',
            title: data['title'] ?? '',
            isFeatured: data['isFeatured'] ?? false,
            city: data['city'] ?? 'genova',
            categories: data['categories'] ?? []
        } : null;
    }
}