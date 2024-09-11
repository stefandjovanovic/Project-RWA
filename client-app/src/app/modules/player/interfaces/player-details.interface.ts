import {Review} from "./review.interface";

export interface PlayerDetails{
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  bio: string;
  profilePicture: string;
  reviews: Review[]
}
