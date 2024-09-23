import { Sport } from "../enums/sport.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { Court } from "./court.entity";
import { TimeSlot } from "./time-slot.entity";
import { Team } from "src/teams/entities/team.entity";
export declare class Event {
    id: any;
    title: string;
    date: Date;
    description: string;
    sport: Sport;
    numOfParticipants: number;
    maxParticipants: number;
    price: number;
    owner: PlayerDetails;
    participants: PlayerDetails[];
    court: Court;
    timeSlot: TimeSlot;
    private: boolean;
    belongsTeam: Team;
}
