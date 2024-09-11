import { PlayerDetails } from "./player-details.entity";
export declare class Review {
    id: string;
    comment: string;
    rating: number;
    username: string;
    user: PlayerDetails;
}
