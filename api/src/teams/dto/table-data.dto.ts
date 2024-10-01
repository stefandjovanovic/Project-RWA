import { Sport } from "src/events/enums/sport.enum";

export class TableDataDto {
    id: string;
    sport: Sport;
    name: string;
    wins: number;
    draws: number;
    losses: number;
    points: number;
}