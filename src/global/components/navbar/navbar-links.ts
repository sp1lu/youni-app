import type { NavbarLink } from './navbar-link.interface'

export const NAVBAR_LINKS: NavbarLink[] = [
    { id: 'feed', path: '/feed', label: 'Feed', allowedRoles: [], icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/space_dashboard_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'events', path: '/events', label: 'Eventi', allowedRoles: [], icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/calendar_today_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'discounts', path: '/discounts', label: 'Convenzioni', allowedRoles: [], icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/calendar_today_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg` },
    { id: 'login', path: '/login', label: 'Login', allowedRoles: [], icon: `${import.meta.env.VITE_PUBLIC_URL}/icons/login_24dp_000000_FILL0_wght400_GRAD0_opsz24` }
];