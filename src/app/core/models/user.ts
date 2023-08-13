import { UserRole } from "../enums/user-role.enum";

export interface User {
    name: string;
    role?: UserRole;
    password: string;
}