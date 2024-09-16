import { User } from "src/auth/user.entity";
import { Review } from "./review.entity";
import { Event } from "src/events/entities/event.entity";
export declare class PlayerDetails {
    id: string;
    bio: string;
    profilePicture: string;
    user: User;
    reviews: Review[];
    events: Event[];
    ownEvents: Event[];
}
