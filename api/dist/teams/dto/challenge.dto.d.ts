import { ChallengeStatus } from "../enums/challenge-status.enum";
export declare class ChallengeDto {
    id: string;
    challengerTeamName: string;
    challengedTeamName: string;
    sport: string;
    status: ChallengeStatus;
    courtName: string;
    date: Date;
    courtAddress: string;
    startTime: number;
    endTime: number;
    resultSubmitted: boolean;
}
