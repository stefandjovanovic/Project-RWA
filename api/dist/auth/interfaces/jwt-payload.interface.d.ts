import { Role } from "../enums/roles.enum";
export interface JwtPayload {
    username: string;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    address: string;
    id: string;
}
