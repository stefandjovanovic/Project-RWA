import { Sport } from "src/events/enums/sport.enum";
import { TeamMemberDto } from "./team-member.dto";

export class TeamDto{
    id: string;
    name: string;
    sport: Sport;
    wins: number;
    losses: number;
    draws: number;
    captainUsername: string;
    members:TeamMemberDto[];
}