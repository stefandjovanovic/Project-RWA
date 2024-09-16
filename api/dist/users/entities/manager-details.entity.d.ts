import { User } from "src/auth/user.entity";
import { Court } from "src/events/entities/court.entity";
export declare class ManagerDetails {
    id: string;
    user: User;
    courts: Court[];
}
