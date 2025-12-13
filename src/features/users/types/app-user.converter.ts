/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { AppUser } from './app-user.interface'

/** Converter */
export const appUserConverter = {
    toFirestore: (user: AppUser) => {
        const { id, ...rest } = user;
        return {
            ...rest
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): AppUser | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            email: data['email'] ?? '',
            role: data['role'] ?? 'USER',
            firstName: data['firstName'] ?? '',
            lastName: data['lastName'] ?? '',
            city: data['city'] ?? ''
        } : null;
    }
}