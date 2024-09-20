import { Sport } from "src/events/enums/sport.enum";

export class CreateTeamDto {
    name: string;
    sport: Sport;
}