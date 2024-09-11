import { User } from "src/auth/user.entity";
import { Review } from "./review.entity";
export declare class PlayerDetails {
    id: string;
    bio: string;
    profilePicture: string;
    user: User;
    reviews: Review[];
}
