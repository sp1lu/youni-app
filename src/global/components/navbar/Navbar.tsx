/** Dependencies */
import { NavLink } from 'react-router'

/** Types */
import type { NavbarLink } from './navbar-link.interface'

/** Data */
import { NAVBAR_LINKS } from './navbar-links'

/** Style */
import './Navbar.scss'

/** Interface */
interface NavbarProps {
    isLogged: boolean,
    userRole: string,
    logOutIcon: string,
    externalUrlsMap?: Map<string, string>,
    onLogout: () => void
}

/** Component */
function Navbar(props: NavbarProps) {
    const { isLogged, logOutIcon, externalUrlsMap, onLogout } = props;

    /** Methods */
    const onLogoutClick = (): void => {
        onLogout();
    }

    /** Node */
    return (
        <>
            <nav className="navbar">
                <ul className='navbar-list'>
                    {
                        NAVBAR_LINKS.map((l: NavbarLink) => (
                            l.path === '/login' && isLogged ? '' :
                                l.isExternal ?
                                    (
                                        externalUrlsMap && externalUrlsMap.has(l.path) ?
                                            <div className='navbar-element' key={l.id}>
                                                <a href={externalUrlsMap.get(l.path)} target='_blank' className='navbar-element__link fw-700'>
                                                    {
                                                        l.icon ? <span style={{ maskImage: `url(${l.icon})` }} className='navbar-element__icon'></span> : ''
                                                    }
                                                    {l.label}
                                                </a>
                                            </div> :
                                            ''
                                    )
                                    :
                                    <div className='navbar-element' key={l.id}>
                                        <NavLink to={l.path} className={({ isActive }) => `navbar-element__link fw-700 ${isActive ? 'navbar-element__link--active' : ''}`}>
                                            {
                                                l.icon ? <span style={{ maskImage: `url(${l.icon})` }} className='navbar-element__icon'></span> : ''
                                            }
                                            {l.label}
                                        </NavLink>
                                    </div>
                        ))
                    }
                    {
                        isLogged ?
                            <button type='button' className='navbar-logout fw-700' onClick={onLogoutClick}>
                                <span style={{ maskImage: `url(${logOutIcon})` }} className='navbar-element__icon'></span>
                                Logout
                            </button> :
                            ''
                    }
                </ul>
                <div className='navbar-element'>
                    <a href='https://youni.life/contatti/' target='_blank' className='navbar-element__link fw-700'>
                        <span style={{ maskImage: `url(${import.meta.env.VITE_PUBLIC_URL}/icons/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` }} className='navbar-element__icon'></span>
                        Contatti
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navbar