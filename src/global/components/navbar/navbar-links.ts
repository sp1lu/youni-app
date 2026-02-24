import type { NavbarLink } from './navbar-link.interface'

export const NAVBAR_LINKS: NavbarLink[] = [
    { id: 'feed', path: '/feed', label: 'Feed', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/space_dashboard_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'events', path: '/events', label: 'Eventi', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/calendar_today_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'discounts', path: '/discounts', label: 'Convenzioni', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/sell_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'news', path: 'newsUrl', isExternal: true, label: 'News', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/newspaper_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'graduation', path: 'graduationUrl', isExternal: true, label: 'Servizi per la laurea', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/school_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'account', path: '/account', label: 'Il mio profilo', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'login', path: '/login', label: 'Login', icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/login_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` }
];