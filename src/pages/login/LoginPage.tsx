/** Dependencies */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Interfaces */
interface LoginFormData {
    email: string,
    password: string
}

/** Styles */
import './LoginPage.scss'
import { FirebaseError } from 'firebase/app'

/** Component */
function LoginPage() {
    /** Navigate */
    const navigate = useNavigate();

    /** Contexts */
    const { createAccountWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle } = useAuth();
    const { createSnackbar, removeSnackbar } = useSnackbars();

    /** State */
    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });

    /** Methods */
    const onFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (formData.email.length === 0 || formData.password.length < 6) return;

        const snackbarId = createSnackbar('Autenticazione in corso', 'SUCCESS');

        try {
            await createAccountWithEmailAndPassword(formData.email, formData.password);
            navigate('/signup');

        } catch (err: unknown) {
            if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
                try {
                    await loginWithEmailAndPassword(formData.email, formData.password);
                    navigate('/');

                } catch (loginError: unknown) {

                    if (loginError instanceof FirebaseError && loginError.code === 'auth/invalid-credential') {
                        createSnackbar('Password non corretta.', 'ERROR');
                        return;
                    }

                    createSnackbar(loginError instanceof Error ? loginError.message : 'Errore durante il login.', 'ERROR');
                }
                return;
            }

            createSnackbar(err instanceof Error ? err.message : `Errore nella creazione dell'utente.`, 'ERROR');
        } finally {
            removeSnackbar(snackbarId);
        }
    };

    const loginWithGoogle = () => {
        signInWithGoogle()
            .then(() => navigate('/'))
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore durante l'autenticazione con Google.`, 'ERROR'))
    }

    // const loginWithApple = () => {
    //     signInWithApple()
    //         .then(() => navigate('/'))
    //         .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore durante l'autenticazione con Apple.`, 'ERROR'))
    // }

    const onInputChange = (event: ChangeEvent): void => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData((prevState: LoginFormData) => ({
            ...prevState,
            [name]: value
        }))
    }

    /** Node */
    return (
        <div className='page login-page'>
            <div className='login'>
                <div className='login__logo'>
                    <img src={`${import.meta.env.VITE_PUBLIC_URL}/images/younilife_logo.svg`} alt='youni life logo' />
                </div>
                <div className='login__title'>
                    <p className='subtitle-s'>Accedi ad eventi e servizi dedicati al mondo universitario</p>
                </div>

                <form className='login__form' onSubmit={onFormSubmit}>
                    <input type='email' name='email' id='email' placeholder='Email' value={formData.email} onChange={onInputChange} required />
                    <input type='password' name='password' id='password' placeholder='Password' minLength={6} value={formData.password} onChange={onInputChange} required />
                    <button type='submit' className='primary'>Entra</button>
                </form>

                <div className='login__divider'>
                    <span className='line'></span>
                    <p>oppure</p>
                    <span className='line'></span>
                </div>

                <div className='login__btns'>
                    <button type='button' className='secondary google-btn' onClick={loginWithGoogle}>
                        <span className='google-icon'></span>
                        Continua con Google
                    </button>
                </div>

                <div className='login__footer'>
                    <p>Hai dimenticato la password? <Link to='/reset-password'>Niente paura!</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage