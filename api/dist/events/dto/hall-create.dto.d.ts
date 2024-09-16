import { Sport } from "../enums/sport.enum";
export declare class HallCreateDto {
    sport: Sport;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    startTime: number;
    endTime: number;
    image: string;
    pricePerHour: number;
}
