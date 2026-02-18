/** Dependencies */
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

/** Models */
import { appUserConverter, type AppUser, type City, type User } from '../../features/users'

/** Services */
import { addUser, getAllCities, getUserById } from '../../features/users/services'

/** Contexts */
import { useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Styles */
import './Signup.scss'

/** Component */
function SignupPage() {
    /** Navigate */
    const navigate = useNavigate();

    /** Contexts */
    const { baseUser, refreshUser } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** State */
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [cities, setCities] = useState<City[]>([]);

    /** Effects */
    useEffect(() => {
        getAllCities()
            .then((cities: City[]) => {
                setCities([...cities]);
                setFormData((prevValue) => ({ ...prevValue, city: cities[0].id }))
            })
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nel recupero dei dati del form.`, 'ERROR'))
    }, []);

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
            !('firstName' in formData) ||
            !('lastName' in formData) ||
            !('city' in formData)
        ) return;

        if (!baseUser) return;

        const dbUser: User | null = await getUserById(baseUser.id, 'appUsers', appUserConverter);
        if (dbUser) return;

        const user: AppUser = {
            id: baseUser.id,
            email: baseUser.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            city: formData.city,
            role: 'USER'
        };

        addUser(user, 'appUsers', appUserConverter)
            .then(async () => {
                await refreshUser();
                navigate('/')
            })
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nella creazione dell'utente.`, 'ERROR'))
    }

    /** Node */
    return (
        <div className='page signup-page'>
            <div className='signup'>
                <div className='signup__title'>
                    <h1 className='title-l'>Dicci qualcosa di te</h1>
                    <p className='subtitle-s'>Non vediamo l'ora di averti a bordo.</p>
                </div>

                <form className='signup__form' onSubmit={onSubmit}>
                    <div className='form__user-data'>
                        <input type='text' name='firstName' id='firstName' placeholder='Nome' value={formData.firstName || ''} required onChange={(e) => onInputChange(e, 'firstName')} />
                        <input type='text' name='lastName' id='lastName' placeholder='Cognome' value={formData.lastName || ''} required onChange={(e) => onInputChange(e, 'lastName')} />
                    </div>

                    <p className='form__radio-label'>In quale città studi</p>
                    <div className='form__radio-group'>
                        {
                            cities.map((c: City) => (
                                <div className='form-field' key={c.id}>
                                    <label htmlFor={c.id}>
                                        <input type='radio' name='city' value={c.id} id={c.id} checked={formData.city === c.id} required onChange={(e) => onInputChange(e, 'city')} />
                                        {c.label}
                                    </label>
                                </div>
                            ))
                        }
                    </div>

                    <button type='submit' className='primary'>Registrati</button>
                    <div className='form-field'>
                        <label htmlFor='privacy-policy'>Confermo di aver letto la privacy policy e la cookie policy di Youni</label>
                        <input type='checkbox' name='privacyPolicy' id='privacy-policy' required />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;