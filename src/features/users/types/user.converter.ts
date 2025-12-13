/** Dependencies */
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore'

/** Types */
import type { User } from './user.interface';

/** Converter */
export const userConverter = {
    toFirestore: (user: User) => {
        return {
            email: user['email'] ?? '',
            role: user['role'] ?? 'USER'
        }
    },
    fromFirestore: (snapshot: DocumentSnapshot): User | null => {
        const data: DocumentData | undefined = snapshot.data();
        return data ? {
            id: snapshot.id,
            email: data['email'] ?? '',
            role: data['role'] ?? 'USER'
        } as User : null;
    }
}