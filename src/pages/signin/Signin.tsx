/** Dependencies */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'

/** Services */
import { useAuth } from '../../features/auth';

function SigninPage() {
    /** Contexts */
    const { loginWithEmailAndPassword, signInWithGoogle, signInWithApple } = useAuth();

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

        loginWithEmailAndPassword(formData.email, formData.password);
    }

    const loginWithGoogle = () => {
        signInWithGoogle();
    }

    const loginWithApple = () => {
        signInWithApple();
    }

    /** Node */
    return (
        <div>
            <div>
                <h1>Rieccoti!</h1>
                <p>É bello rivederti! Ma chi sei?</p>
            </div>

            <form onSubmit={onSubmit}>
                <input type="email" name="email" id="email" placeholder='Email' value={formData.email || ''} onChange={(e) => onInputChange(e, 'email')} />
                <input type="password" name="password" id="password" placeholder='Password' value={formData.password || ''} onChange={(e) => onInputChange(e, 'password')} />
                <button type="submit">Entra</button>
            </form>

            <div>
                <p>oppure</p>
            </div>

            <div>
                <button type='button' onClick={loginWithGoogle}>Continua con Google</button>
                <button type='button' onClick={loginWithApple}>Continua con Apple</button>
            </div>

            <p>Non hai un account? <Link to='/landing'>Allora registrati!</Link></p>
        </div>
    )
}

export default SigninPage