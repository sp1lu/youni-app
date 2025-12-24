/** Dependencies */
import { collection, getDocs, query, QueryDocumentSnapshot } from 'firebase/firestore'

/** Types */
import { type DiscountCategory, discountCatgegoryConverter } from '../types'

/** Services */
import { db } from './firebase.service'

/**Methods */
export async function getAllDiscountCategories(): Promise<DiscountCategory[]> {
    const q = query(collection(db, 'discountCategories')).withConverter(discountCatgegoryConverter);
    const categories: DiscountCategory[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DiscountCategory | null>) => {
            const category = doc.data();
            if (category) categories.push(category);
        })
    } catch (error) {
        throw new Error('Errore nel recupero delle categories.');
    }

    return categories;
}

export function getDiscountCategoryLabel(id: string, categories: DiscountCategory[]): string | undefined {
    return categories.find((C: DiscountCategory) => C.id === id)?.label ?? undefined;        
}