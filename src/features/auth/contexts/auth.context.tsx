/** Dependencies */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'

/** Services */
import { auth } from '../../../global/services'
import { createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, resetPassword, deleteCurrentUser, logout } from '../services'

/** Types */
import { appUserConverter, getUserById, type AppUser } from '../../users'

interface AuthContextValue {
    user: AppUser | null,
    baseUser: Pick<AppUser, 'id' | 'email'> | null,
    firebaseUser: FirebaseUser | null,
    loading: boolean,
    refreshUser: () => Promise<void>,
    createAccountWithEmailAndPassword: (email: string, password: string) => Promise<void>,
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>,
    signInWithGoogle: () => Promise<void>,
    signInWithApple: () => Promise<void>,
    resetPassword: (email: string) => Promise<void>,
    deleteCurrentUser: () => Promise<void>,
    logout: () => Promise<void>
}

/** Provider */
export const AuthContext = createContext<AuthContextValue>({
    user: null,
    baseUser: null,
    firebaseUser: null,
    loading: true,
    refreshUser: async () => { },
    createAccountWithEmailAndPassword: async () => { },
    loginWithEmailAndPassword: async () => { },
    signInWithGoogle: async () => { },
    signInWithApple: async () => { },
    resetPassword: async () => { },
    deleteCurrentUser: async () => { },
    logout: async () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [baseUser, setBaseUser] = useState<Pick<AppUser, 'id' | 'email'> | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshUser = async () => {
        if (!baseUser) return;
        setLoading(true);

        try {
            const updatedUser = await getUserById(baseUser.id, 'appUsers', appUserConverter);
            setUser(updatedUser);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);

            if (!firebaseUser) {
                setBaseUser(null);
                setUser(null);
                setFirebaseUser(null);
                setLoading(false);
                return;
            }

            setFirebaseUser(firebaseUser);
            setBaseUser({ id: firebaseUser.uid, email: firebaseUser.email ?? '' });

            const appUser = await getUserById<AppUser | null>(firebaseUser.uid, 'appUsers', appUserConverter);

            setUser(appUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, baseUser, firebaseUser, loading, refreshUser, createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, resetPassword, deleteCurrentUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)