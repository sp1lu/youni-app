/** Dependencies */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'

/** Services */
import { auth } from '../../../global/services'
import { loginWithEmailAndPassword, signInWithGoogle, signInWithApple, logout } from '../services'

/** Types */
import type { User } from '../../users'

interface AuthContextValue {
    user: User | null,
    loading: boolean,
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>,
    signInWithGoogle: () => void,
    signInWithApple: () => void,
    logout: () => void
}

/** Provider */
export const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
    loginWithEmailAndPassword: async () => { },
    signInWithGoogle: async () => { },
    signInWithApple: async () => { },
    logout: () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                console.log(firebaseUser);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, loginWithEmailAndPassword, signInWithGoogle, signInWithApple, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)