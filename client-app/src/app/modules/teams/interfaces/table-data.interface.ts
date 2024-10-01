import {Sport} from "../../events/enums/sport.enum";

export interface TableData{
  id: string;
  sport: Sport;
  name: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}
