/** Dependencies */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'

/** Services */
import { auth } from '../../../global/services'
import { createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, logout } from '../services'

/** Types */
import { getUserById, userConverter, type User } from '../../users'

interface AuthContextValue {
    user: User | null,
    baseUser: Pick<User, 'id' | 'email'> | null,
    loading: boolean,
    createAccountWithEmailAndPassword: (email: string, password: string) => Promise<void>,
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>,
    signInWithGoogle: () => Promise<void>,
    signInWithApple: () => Promise<void>,
    logout: () => Promise<void>
}

/** Provider */
export const AuthContext = createContext<AuthContextValue>({
    user: null,
    baseUser: null,
    loading: true,
    createAccountWithEmailAndPassword: async () => { },
    loginWithEmailAndPassword: async () => { },
    signInWithGoogle: async () => { },
    signInWithApple: async () => { },
    logout: async () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [baseUser, setBaseUser] = useState<Pick<User, 'id' | 'email'> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            setLoading(true);

            if (!firebaseUser) {
                setBaseUser(null);
                setUser(null);
                setLoading(false);
                return;
            }

            setBaseUser({ id: firebaseUser.uid, email: firebaseUser.email ?? '' });

            getUserById<User | null>(firebaseUser.uid, 'appUsers', userConverter)
                .then((appUser: User | null) => setUser(appUser))
                .finally(() => setLoading(false))
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, baseUser, loading, createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)