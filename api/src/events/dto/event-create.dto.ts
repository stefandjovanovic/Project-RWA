import { Sport } from "../enums/sport.enum";

export class EventCreateDto {
    title: string;
    description: string;
    date: Date;
    sport: Sport;
    startTime: number;
    endTime: number;
    courtId: string;
    maxParticipants: number;
    price: number;
}