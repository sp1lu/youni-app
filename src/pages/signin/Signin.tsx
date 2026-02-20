/** Dependencies */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

/** Contexts */
import { useSnackbars } from '../../features/snackbars'

/** Services */
import { useAuth } from '../../features/auth'

/** Styles */
import './Signin.scss'

function SigninPage() {
    /** Navigate */
    const navigate = useNavigate();

    /** Contexts */
    const { loginWithEmailAndPassword, signInWithGoogle, signInWithApple } = useAuth();
    const { createSnackbar, removeSnackbar } = useSnackbars();

    /** State */
    const [formData, setFormData] = useState<Record<string, string>>({});

    /** Methods */
    const onInputChange = (event: ChangeEvent, id: string): void => {
        const input = event.target as HTMLInputElement;
        const value: string = input.value;

        setFormData((prevValue) => ({
            ...prevValue,
            [id]: value
        }));
    }

    const onSubmit = async (formEvent: FormEvent): Promise<void> => {
        formEvent.preventDefault();

        if (
            !('email' in formData) ||
            !('password' in formData)
        ) return;

        const snackbarId: string = createSnackbar('Autenticazione in corso', 'SUCCESS');
        loginWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                navigate('/');
            })
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nel login.`, 'ERROR'))
            .finally(() => removeSnackbar(snackbarId))
    }

    const loginWithGoogle = () => {
        signInWithGoogle();
    }

    const loginWithApple = () => {
        signInWithApple();
    }

    /** Node */
    return (
        <div className='page signin-page'>
            <div className='signin'>
                <div className='signin__title'>
                    <h1 className='title-l'>Rieccoti!</h1>
                    <p className='subtitle-s'>É bello rivederti! Ma chi sei?</p>
                </div>

                <form className='signin__form' onSubmit={onSubmit}>
                    <input type='email' name='email' id='email' placeholder='Email' value={formData.email || ''} onChange={(e) => onInputChange(e, 'email')} />
                    <input type='password' name='password' id='password' placeholder='Password' value={formData.password || ''} onChange={(e) => onInputChange(e, 'password')} />
                    <button type='submit' className='primary'>Entra</button>
                </form>

                <div className='signin__divider'>
                    <span className='line'></span>
                    <p>oppure</p>
                    <span className='line'></span>
                </div>

                <div className='signin__btns'>
                    <button type='button' className='secondary google-btn' onClick={loginWithGoogle}>
                        <span className='google-icon'></span>
                        Continua con Google
                    </button>
                    <button type='button' className='secondary apple-btn' onClick={loginWithApple}>
                        <span className='apple-icon'></span>
                        Continua con Apple
                    </button>
                </div>
                <div className='signin__footer'>
                    <p>Non hai un account? <Link to='/landing'>Allora registrati!</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SigninPage