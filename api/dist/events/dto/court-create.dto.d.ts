import { Sport } from "../enums/sport.enum";
export declare class CourtCreateDto {
    sport: Sport;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    image: string;
}
