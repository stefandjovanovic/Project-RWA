import {Sport} from "../../events/enums/sport.enum";

export interface CreateChallenge {
  sport: Sport;
  courtId: string;
  date: Date;
  startTime: number;
  endTime: number;
  challengerTeamId: string;
  challengedTeamId: string;
}
