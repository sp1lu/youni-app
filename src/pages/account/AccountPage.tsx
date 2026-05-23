/** Contexts */
import { NavLink } from 'react-router';
import { useEffect, useRef, useState } from 'react';

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'
import { getAllCities, type City } from '../../features/users'

/** Services */
import { useAuth } from '../../features/auth'

/** Components */
import { PWABanner } from '../../features/pwa';
import { Drawer, Header, Navbar } from '../../global/components'

/** Style */
import './AccountPage.scss'

/** Component */
function AccountPage() {
    /** Contexts */
    const { user, logout } = useAuth();

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

    /** Node */
    return (
        <div className='page account-page'>
            <Header text='Il mio profilo' style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' }}>
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
            <div className='account-options'>
                <div className='account-option'>
                    <NavLink to='./youni-card' className='account-option__link'>
                        <span className='account-option__icon account-option__icon--qr'></span>
                        <span className='account-option__label'>Youni card</span>
                        <span className='account-option__arrow'></span>
                    </NavLink>
                </div>
                <div className='account-option'>
                    <NavLink to='./personal-info' className='account-option__link'>
                        <span className='account-option__icon account-option__icon--data'></span>
                        <span className='account-option__label'>Dati personali</span>
                        <span className='account-option__arrow'></span>
                    </NavLink>
                </div>
                <div className='account-option'>
                    <NavLink to='./my-tickets' className='account-option__link'>
                        <span className='account-option__icon account-option__icon--ticket'></span>
                        <span className='account-option__label'>I miei eventi</span>
                        <span className='account-option__arrow'></span>
                    </NavLink>
                </div>
            </div>
            <div className='account-footer'>
                <NavLink to='./delete-account' className='warning'>Elimina account</NavLink>
            </div>
        </div>
    )
}

export default AccountPage