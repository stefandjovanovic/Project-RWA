export class CreateChallengeDto {
    sport: string;
    courtId: string;
    date: Date;
    startTime: number;
    endTime: number;
    challengerTeamId: string;
    challengedTeamId: string;
}