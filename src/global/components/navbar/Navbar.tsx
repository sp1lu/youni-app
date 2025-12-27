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
    onLogout: () => void
}

/** Component */
function Navbar(props: NavbarProps) {
    const { isLogged, userRole, logOutIcon, onLogout } = props;

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
                            (l.path === '/login' && isLogged) || (l.allowedRoles.length > 0 && !l.allowedRoles.includes(userRole)) ?
                                '' :
                                <div className='navbar-element' key={l.path}>
                                    {/* <NavLink to={l.path} className='navbar-element__link fw-700'> */}
                                    <NavLink to={l.path} className={({isActive}) => `navbar-element__link fw-700 ${isActive ? 'navbar-element__link--active' : ''}`}>
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
                            <button type="button" className='navbar-logout fw-700' onClick={onLogoutClick}>
                                <span style={{ maskImage: `url(${logOutIcon})` }} className='navbar-element__icon'></span>
                                Logout
                            </button> :
                            ''
                    }
                </ul>
            </nav>
        </>
    )
}

export default Navbar