import { ReviewDto } from "./review.dto";
export declare class PlayerDetailsDto {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    bio: string;
    profilePicture: string;
    reviews: ReviewDto[];
}
