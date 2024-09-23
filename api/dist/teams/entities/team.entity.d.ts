import { Event } from "src/events/entities/event.entity";
import { Sport } from "src/events/enums/sport.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { Challenge } from "./challenge.entity";
export declare class Team {
    id: any;
    name: string;
    sport: Sport;
    wins: number;
    losses: number;
    draws: number;
    captain: PlayerDetails;
    captainUsername: string;
    members: PlayerDetails[];
    privateEvents: Event[];
    challengerList: Challenge[];
    challengedList: Challenge[];
}
