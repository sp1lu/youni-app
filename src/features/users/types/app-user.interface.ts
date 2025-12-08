import type { User } from './user.interface'

export interface AppUser extends User {
    firstName: string;
    lastName: string;
    city: string;
}