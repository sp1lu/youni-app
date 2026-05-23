/** Contexts */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'
import type { City } from '../../features/users'

/** Services */
import { getAllCities } from '../../features/users'

/** Components */
import { PWABanner } from '../../features/pwa';
import { Drawer, Header, Navbar, QRCodeCanvas } from '../../global/components'

/** Style */
import './YouniCardPage.scss'

/** Component */
function YouniCardPage() {
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
        <div className='page younicard-page'>
            <Header text='Youni Card' style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' }}>
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
            <PWABanner closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} />
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} externalUrlsMap={cities.find((c) => c.id === user?.city)?.links} onLogout={logout} />
            </Drawer>
            <div className='younicard-page__content'>
                <div className='qrcode-wrapper'>
                    {
                        user && <QRCodeCanvas url={`${import.meta.env.VITE_ADMIN_URL}/#/check/user/${user.id}`} />
                    }
                </div>
                <p className='younicard-sub'>Questa ☝️ è la tua Youni Card digitale!</p>

                <div className='younicard-desc'>
                    <h3>A cosa serve la Youni card?</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent felis lacus, ultrices ornare tempus pellentesque, consequat vitae mauris.

                        Nulla facilisi. Duis vitae euismod elit, quis ultrices leo. Nunc elementum erat ac malesuada posuere. Cras sodales metus at consectetur fringilla. Sed semper mi vitae turpis gravida, et pharetra nibh aliquet.

                        Morbi sed scelerisque lectus. Mauris sed sapien maximus, iaculis odio eu, consequat sapien.</p>
                </div>
            </div>
        </div>
    )
}

export default YouniCardPage