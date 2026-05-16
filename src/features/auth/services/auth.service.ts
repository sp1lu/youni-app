/** Dependencies */
import { createUserWithEmailAndPassword, GoogleAuthProvider, OAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, deleteUser, signOut, type AuthError, type UserCredential, type User as FirebaseUser } from 'firebase/auth'

/** Data */
import { auth } from '../../../global/services'

/** Functions */
export const createAccountWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
            console.log('Nuovo utente creato con email e password:', userCredential.user);
        })
}

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
            console.log('Utente loggato con email e password:', userCredential.user);
        })
        .catch((error: any) => {
            throw new Error(error instanceof Error ? error.message : `Errore nell'effettuare il login.`);
        })
}

export const signInWithGoogle = async (): Promise<void> => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Utente loggato con Google:', user);
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : `Errore nell'autenticazione con Google.`);
    }
};

export const signInWithApple = async (): Promise<void> => {
    try {
        const provider = new OAuthProvider('apple.com');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Utente loggato con Apple:', user);
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : `Errore nell'autenticazione con Apple.`);
    }
}

export const logout = async (): Promise<void> => {
    return signOut(auth)
        .then(() => {
            console.log('Log out effettuato correttamente');
        })
        .catch((error: AuthError) => {
            throw new Error(error instanceof Error ? error.message : `Errore nell'effettuare il logout.`);
        })
}

export const resetPassword = async (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
}

export const deleteCurrentUser = async (): Promise<void> => {
    if (!auth.currentUser) {
        throw new Error('Nessun utente autenticato.');
    }

    await deleteUser(auth.currentUser);
}