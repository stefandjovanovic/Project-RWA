import {Sport} from "../../events/enums/sport.enum";
import {TeamMember} from "./team-member.interface";

export interface Team {
  id: string;
  name: string;
  sport: Sport;
  wins: number;
  losses: number;
  draws: number;
  captainUsername: string;
  members:TeamMember[];
}
