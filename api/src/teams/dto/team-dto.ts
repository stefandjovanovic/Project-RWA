import { Sport } from "src/events/enums/sport.enum";

export class TeamDto{
    id: string;
    name: string;
    sport: Sport;
    wins: number;
    losses: number;
    draws: number;
    captainUsername: string;
    members:{
        userId: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    }[];
}