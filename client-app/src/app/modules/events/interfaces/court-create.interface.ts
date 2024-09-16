import {Sport} from "../enums/sport.enum";

export interface CourtCreate {
  sport: Sport;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  image: string;
}
