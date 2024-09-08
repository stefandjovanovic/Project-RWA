import { Role } from "./enums/roles.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { ManagerDetails } from "src/users/entities/manager-details.entity";
export declare class User {
    id: string;
    role: Role;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    password: string;
    salt: string;
    playerDetails: PlayerDetails;
    managerDetails: ManagerDetails;
    validatePassword(password: string): Promise<boolean>;
}
