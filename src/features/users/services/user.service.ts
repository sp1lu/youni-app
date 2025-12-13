/** Dependencies */
import { collection, deleteDoc, doc, getDoc, getDocs, query, QueryDocumentSnapshot, setDoc, where, type FirestoreDataConverter } from 'firebase/firestore'

/** Types */
import type { User } from '../types'

/** Services */
import { db } from '../../../global/services'

/** Methods */
export async function addUser(data: User, collectionId: string, converter: FirestoreDataConverter<User | null>): Promise<void> {   
    const { id, ...user } = data;
    try {
        const docRef = doc(db, collectionId, id).withConverter(converter);
        await setDoc(docRef, user);
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : 'Errore nel salvataggio dell\'utente.');
    }
}

export async function updateUser(data: User, collectionId: string, converter: FirestoreDataConverter<User | null>): Promise<void> {
    const { id, ...user } = data;
    try {
        const docRef = doc(db, collectionId, id).withConverter(converter);
        await setDoc(docRef, user);
    } catch (error) {
        throw new Error('Errore nel salvataggio dell\'utente.');
    }
}

export async function getAllUsers<T>(collectionId: string, converter: FirestoreDataConverter<T | null>): Promise<T[]> {
    const q = query(collection(db, collectionId)).withConverter(converter);
    const users: T[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<T | null>) => {
            const user = doc.data();
            if (user) users.push(user);
        })
    } catch (error) {
        throw new Error('Errore nel recupero degli utenti.');
    }

    return users;
}

export async function getUserById<T>(id: string, collection: string, converter: FirestoreDataConverter<T | null>): Promise<T | null> {
    try {
        const docRef = doc(db, collection, id).withConverter(converter);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data() ?? null;
        return user;
    } catch (error) {
        throw error instanceof Error ?
            error :
            new Error('Errore nel recupero dell\'uente.');
    }
}

export async function getUserByEmail<T>(email: string, collectionId: string, converter: FirestoreDataConverter<T | null>): Promise<T | null> {
    const q = query(collection(db, collectionId), where('email', '==', email),).withConverter(converter);
    const users: T[] = [];

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: QueryDocumentSnapshot<T | null>) => {
            const user = doc.data();
            if (user) users.push(user);
        });
    } catch (error) {
        throw new Error('Errore nel recupero degli utenti.');
    }

    return users.length === 0 ? null : users[0];
}

export async function deleteUserById(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'appUsers', id));
    } catch (error) {
        throw new Error('Errore nell\'eliminazione dell\'utente.');
    }
}