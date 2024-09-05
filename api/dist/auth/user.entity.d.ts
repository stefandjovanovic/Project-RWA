import { Roles } from "./enums/roles.enum";
export declare class User {
    id: string;
    role: Roles;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    password: string;
    salt: string;
    validatePassword(password: string): Promise<boolean>;
}
