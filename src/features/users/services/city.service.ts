/** Dependencies */
import { collection, getDocs, query, QueryDocumentSnapshot } from 'firebase/firestore'

/** Types */
import { cityConverter, type City } from '../types'

/** Services */
import { db } from '../../../global/services'

/** Methods */
export async function getAllCities(): Promise<City[]> {
    const q = query(collection(db, 'cities')).withConverter(cityConverter);
    const cities: City[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<City | null>) => {
            const user = doc.data();
            if (user) cities.push(user);
        })
    } catch (error) {
        throw new Error('Errore nel recupero delle città.');
    }

    return cities;
}

export function getCityLabel(id: string, cities: City[]): string | undefined {
    return cities.find((C: City) => C.id === id)?.label ?? undefined;
}