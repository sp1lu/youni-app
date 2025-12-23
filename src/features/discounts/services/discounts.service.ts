/** Dependencies */
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, QueryDocumentSnapshot, setDoc } from 'firebase/firestore'

/** Services */
import { db } from '../../../global/services'

/** Types */
import type { Discount } from '../types';
import { discountConverter } from '../types/discount.converter'

/** Methods */
export async function addDiscount(data: Discount): Promise<void> {
    try {
        await addDoc(collection(db, 'discounts').withConverter(discountConverter), {
            ...data
        })
            .catch(() => {
                throw new Error('Errore nel salvataggio della convenzione');
            })
    } catch (error) {
        throw new Error('Errore nel salvataggio della convenzione.');
    }
}

export async function updateDiscount(data: Discount): Promise<void> {
    const { id, ...discount } = data;
    try {
        const docRef = doc(db, 'discounts', id).withConverter(discountConverter);
        await setDoc(docRef, discount);
    } catch (error) {
        throw new Error('Errore nel salvataggio della convenzione');
    }
}

export async function getAllDiscounts(): Promise<Discount[]> {
    const q = query(collection(db, 'discounts')).withConverter(discountConverter);
    const discounts: Discount[] = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<Discount | null>) => {
            const d: Discount | null = doc.data();
            if (d) discounts.push(d);
        })
    } catch (error) {
        throw new Error('Errore nel recupero delle convenzioni.');
    }
    return discounts;
}

export async function getDiscountById(id: string): Promise<Discount | null> {
    try {
        const docRef = doc(db, 'discounts', id).withConverter(discountConverter);
        const docSnap = await getDoc(docRef);
        const discount = docSnap.data();

        if (!discount) {
            throw new Error('Convenzione non presente nel database.');
        }

        return discount
    } catch (error) {
        throw error instanceof Error ?
            error :
            new Error('Errore nel recupero della convenzione');
    }
}

export async function deleteDiscountById(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'events', id));
    } catch (error) {
        throw new Error('Errore nell\'eliminazione della convenzione.');
    }
}