/** Dependencies */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'

/** Services */
import { auth } from '../../../global/services'
import { createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, logout } from '../services'

/** Types */
import { appUserConverter, getUserById, type AppUser } from '../../users'

interface AuthContextValue {
    user: AppUser | null,
    baseUser: Pick<AppUser, 'id' | 'email'> | null,
    loading: boolean,
    refreshUser: () => Promise<void>,
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
    refreshUser: async () => { },
    createAccountWithEmailAndPassword: async () => { },
    loginWithEmailAndPassword: async () => { },
    signInWithGoogle: async () => { },
    signInWithApple: async () => { },
    logout: async () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [baseUser, setBaseUser] = useState<Pick<AppUser, 'id' | 'email'> | null>(null);
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
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            setLoading(true);

            if (!firebaseUser) {
                setBaseUser(null);
                setUser(null);
                setLoading(false);
                return;
            }

            setBaseUser({ id: firebaseUser.uid, email: firebaseUser.email ?? '' });

            getUserById<AppUser | null>(firebaseUser.uid, 'appUsers', appUserConverter)
                .then((appUser: AppUser | null) => setUser(appUser))
                .finally(() => setLoading(false))
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, baseUser, loading, refreshUser, createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)