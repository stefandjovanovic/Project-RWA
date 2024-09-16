import { Sport } from "../enums/sport.enum";

export class CourtResponseDto {
    id: string;
    sport: Sport;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    image: string;
    isHall: boolean;
    pricePerHour: number;
    startTime: number;
    endTime: number;
}