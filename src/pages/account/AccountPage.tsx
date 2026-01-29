/** Contexts */
import { NavLink } from 'react-router';
import { useRef } from 'react';

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'

/** Services */
import { useAuth } from '../../features/auth'

/** Components */
import { Drawer, Header, Navbar } from '../../global/components'

/** Style */
import './AccountPage.scss'

/** Component */
function AccountPage() {
    /** Contexts */
    const { user, logout } = useAuth();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

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
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>
            <div className='account-options'>
                <div className='account-option'>
                    <NavLink to='' className='account-option__link'>
                        <span className='account-option__icon account-option__icon--qr'></span>
                        <span className='account-option__label'>Youni card</span>
                        <span className='account-option__arrow'></span>
                    </NavLink>
                </div>
                <div className='account-option'>
                    <NavLink to='' className='account-option__link'>
                        <span className='account-option__icon account-option__icon--data'></span>
                        <span className='account-option__label'>Dati personali</span>
                        <span className='account-option__arrow'></span>
                    </NavLink>
                </div>
                <div className='account-option'>
                    <NavLink to='' className='account-option__link'>
                        <span className='account-option__icon account-option__icon--ticket'></span>
                        <span className='account-option__label'>I miei eventi</span>
                        <span className='account-option__arrow'></span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default AccountPage