import { Sport } from "../enums/sport.enum";

export class CourtCreateDto {
    sport: Sport;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    image: string;
}