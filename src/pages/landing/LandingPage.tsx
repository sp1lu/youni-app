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
import './LandingPage.scss'

/** Component */
function LandingPage() {
    /** Navigate */
    const navigate = useNavigate();

    /** Contexts */
    const { createAccountWithEmailAndPassword, signInWithGoogle, signInWithApple } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** State */
    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });

    /** Methods */
    const onFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        createAccountWithEmailAndPassword(formData.email, formData.password)
            .then(() => navigate('/signup'))
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nella creazione dell'utente.`, 'ERROR'))
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
        <div className='page login-page'>
            <div className='login'>
                <div className='login__logo'>
                    <img src={`${import.meta.env.VITE_PUBLIC_URL}/images/younilife_logo.svg`} alt='youni life logo' />
                </div>
                <div className='login__title'>
                    <h1 className='title-l'>Registrati</h1>
                    <p className='subtitle-s'>Accedi ad eventi e servizi dedicati al mondo universitario</p>
                </div>

                <form className='login__form' onSubmit={onFormSubmit}>
                    <input type='email' name='email' id='email' placeholder='Email' value={formData.email} onChange={onInputChange} required />
                    <input type='password' name='password' id='password' placeholder='Password' min={6} value={formData.password} onChange={onInputChange} required />
                    <button type='submit' className='primary'>Partiamo!</button>
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
                    <button type='button' className='secondary apple-btn' onClick={loginWithApple}>
                        <span className='apple-icon'></span>
                        Continua con Apple
                    </button>
                </div>

                <div className='login__footer'>
                    <p>Hai già un account? <Link to='/signin'>Allora accedi!</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LandingPage