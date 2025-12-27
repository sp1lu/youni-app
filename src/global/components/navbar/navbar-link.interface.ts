export interface NavbarLink {
    id: string,
    path: string,
    label: string,
    allowedRoles: string[],
    icon?: string
}