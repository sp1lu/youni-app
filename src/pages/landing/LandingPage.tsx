/** Contexts */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from '../../features/auth'

/** Interfaces */
interface LoginFormData {
    email: string,
    password: string
}

/** Component */
function LandingPage() {
    /** State */
    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });

    /** Contexts */
    const { createAccountWithEmailAndPassword, signInWithGoogle, signInWithApple } = useAuth();

    /** Methods */
    const onFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        createAccountWithEmailAndPassword(formData.email, formData.password);
    }

    const loginWithGoogle = () => {
        signInWithGoogle();
    }

    const loginWithApple = () => {
        signInWithApple();
    }

    const onInputChange = (event: ChangeEvent): void => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData((prevState: LoginFormData) => ({
            ...prevState,
            [name]: value
        }))
    }

    /** Node */
    return (
        <div>
            <div>
                <h1>Registrati e scopri il mondo Youni</h1>
                <p>Accedi ad eventi e servizi dedicati al mondo universitario</p>
            </div>

            <form onSubmit={onFormSubmit}>
                <input type='email' name='email' id='email' placeholder='Email' value={formData.email} onChange={onInputChange} required />
                <input type='password' name='password' id='password' placeholder='Password' value={formData.password} onChange={onInputChange} required />
                <button type='submit'>Partiamo!</button>
            </form>

            <div>
                <p>oppure</p>
            </div>

            <div>
                <button type='button' onClick={loginWithGoogle}>Continua con Google</button>
                <button type='button' onClick={loginWithApple}>Continua con Apple</button>
            </div>
        </div>
    )
}

export default LandingPage