/** Dependencies */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Style */
import './ResetPassword.scss'

/** Page */
function RecoverPasswordPage() {
    /** State */
    const [formData, setFormData] = useState<Record<string, string>>({ email: '' });

    /** Contexts */
    const { resetPassword } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** Methods */
    const onInputChange = (event: ChangeEvent, id: string): void => {
        const input = event.target as HTMLInputElement;
        const value: string = input.value;

        setFormData((prevValue) => ({
            ...prevValue,
            [id]: value
        }));
    }

    const onSubmit = (formEvent: FormEvent): void => {
        formEvent.preventDefault();

        if (!('email' in formData)) return;

        resetPassword(formData.email)
            .then(() => createSnackbar('Ti abbiamo inviato un\'email con le istruzioni per il cambio della tua password.', 'SUCCESS'))
    }

    /** Node */
    return (
        <div className='page recover-password-page'>
            <div className="recover-password">
                <div className='recover-password__title'>
                    <h1 className='title-l'>Recupera password</h1>
                    <p className='subtitle-s'>Non ricordi più la password? Niente paura: ci basta conoscere la mail con cui ti sei registrato.</p>
                </div>

                <form className='recover-password__form' onSubmit={onSubmit}>
                    <input type='email' name='email' id='email' placeholder='Email' value={formData.email || ''} required onChange={(e) => onInputChange(e, 'email')} />
                    <button type='submit' className='primary' disabled={!('email' in formData) || formData.email.length === 0}>Recupera password</button>
                </form>

                <div className='recover-password__footer'>
                    <p>Falso allarme? <Link to='/signin'>Torna al login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RecoverPasswordPage