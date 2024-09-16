import { Sport } from "../enums/sport.enum";
export declare class EventDto {
    id: string;
    title: string;
    description: string;
    date: Date;
    sport: Sport;
    startTime: number;
    endTime: number;
    maxParticipants: number;
    numOfParticipants: number;
    price: number;
    pariticipants: string[];
    court: {
        name: string;
        address: string;
        longitude: number;
        latitude: number;
        image: string;
    };
}
