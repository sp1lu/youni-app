/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { DiscountCategory } from './discount-category.interface'

/** Converter */
export const discountCatgegoryConverter = {
    toFirestore: (discountCategory: DiscountCategory) => {
        const { label } = discountCategory;
        return {
            label: label ?? ''
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): DiscountCategory | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            label: data['label'] ?? snapshot.id
        } as DiscountCategory : null;
    }
}