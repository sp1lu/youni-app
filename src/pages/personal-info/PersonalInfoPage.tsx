/** Dependencies */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'
import type { FormField } from '../../global/types'
import type { City } from '../../features/users'

/** Services */
import { appUserConverter, getAllCities, updateUser, userFormdataConverter } from '../../features/users'
import { useSnackbars } from '../../features/snackbars'

/** Components */
import { PWABanner } from '../../features/pwa'
import { Drawer, Header, InputAccordion, Navbar } from '../../global/components'

/** Data */
import { FORM_FIELDS } from './form-fields'

/** Component */
function PersonalInfoPage() {
    /** Contexts */
    const { user, refreshUser, logout } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** State */
    const [formFields, setFormFields] = useState<FormField[]>(FORM_FIELDS);
    const [formData, setFormData] = useState<Record<string, string>>(user ? userFormdataConverter.toFormdata(user) : {});
    const [cities, setCities] = useState<City[]>([]);

    /** Effects */
    useEffect(() => {
        getAllCities()
            .then((cities: City[]) => {
                setCities([...cities]);

                const cityField = formFields.find((f: FormField) => f.id === 'city');

                if (!cityField) return;
                setFormFields((prevState) => {
                    const newFields = prevState.filter((f: FormField) => f.id !== 'city');
                    return [...newFields, { ...cityField, options: [...cities.map((c) => c.id)] }]
                });
            });
    }, []);


    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    const onInputSaveClick = (id: string, value: string): void => {
        if (!user) return;

        const updatedFormData = {
            ...formData,
            [id]: value
        };

        setFormData(updatedFormData)

        updateUser({ ...user, ...userFormdataConverter.toUser(updatedFormData) }, 'appUsers', appUserConverter)
            .then(() => {
                refreshUser();
                createSnackbar(`Dati aggiornati con successo.`, 'SUCCESS');
            })
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nell'aggiornamento dei dati dell'utente.`, 'ERROR'))
    }

    /** Node */
    return (
        <div className='page personal-info-page'>
            <Header text='Dati personali' style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' }}>
                <Header.Left>
                    <Link to='/account'>
                        <div className='back-btn'>
                            <span className='back-btn__icon'></span>
                        </div>
                    </Link>
                </Header.Left>
                <Header.Right>
                    <button type='button' className='drawer-toggle tertiary' onClick={onDrawerToggleClick}>
                        <span className='drawer-toggle__icon'></span>
                    </button>
                </Header.Right>
            </Header>
            <PWABanner />
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>

            {
                user ?
                    <div className='personal-infos'>
                        {
                            formFields.map((field: FormField) => (
                                <InputAccordion key={field.id} id={field.id} label={field.label} input={field.input} options={field.input === 'select' ? cities : undefined} value={formData[field.id]} onSave={onInputSaveClick} desc={field.desc} isDisabled={field.isDisabled} />
                            ))
                        }
                    </div> :
                    ''
            }
        </div>
    )
}

export default PersonalInfoPage