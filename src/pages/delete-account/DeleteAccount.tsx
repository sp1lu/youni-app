/** Dependencies */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'
import type { City } from '../../features/users'

/** Contexts */
import { deleteCurrentUser, useAuth } from '../../features/auth'
import { useSnackbars } from '../../features/snackbars'

/** Services */
import { deleteUserById, getAllCities } from '../../features/users'

/** Components */
import { Drawer, Header, Navbar } from '../../global/components'
import { PWABanner } from '../../features/pwa'

/** Styles */
import './DeleteAccount.scss'

/** Component */
function DeleteAccount() {
    /** Contexts */
    const { user, logout } = useAuth();
    const { createSnackbar } = useSnackbars();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** State */
    const [cities, setCities] = useState<City[]>([]);

    /** Effects */
    useEffect(() => {
        if (!user) return;
        getAllCities()
            .then((cities: City[]) => setCities(cities))
            .catch((err: unknown) => console.log(err))
    }, [user])

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    const onConfirmBtnClick = (): void => {
        if (!user) return;
        deleteUserById(user.id)
            .then(() => deleteCurrentUser())
            .catch((err: unknown) => createSnackbar(err instanceof Error ? err.message : `Errore nella disiscrizione all'evento.`, 'ERROR'))
    }

    /** Node */
    return (
        <div className='page delete-account-page'>
            <Header text='Conferma cancellazione' style={{ fontWeight: 700, textAlign: 'center' }}>
                <Header.Left>
                    <Link to={`/account`}>
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
            <PWABanner closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} />
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} externalUrlsMap={cities.find((c) => c.id === user?.city)?.links} onLogout={logout} />
            </Drawer>

            <div className="delete-account-content">
                <div className='delete-account'>
                    <p>Stai per cancellare l'account associato all'email</p>
                    <h3>{user?.email}</h3>
                    <p>Sicuro di voler proseguire?</p>
                </div>
                <div className='confirm'><button type='button' className='secondary confirm-btn' onClick={onConfirmBtnClick}>Sì, cancella account</button></div>
            </div>
        </div>
    )
}

export default DeleteAccount