import { Challenge } from "./challenge.entity";
import { ResultStatus } from "../enums/result-status.enum";
import { ResultOutcome } from "../enums/result-outcome.enum";
export declare class ChallengeResult {
    id: any;
    challenge: Challenge;
    homeScore: number;
    awayScore: number;
    createdAt: Date;
    resultStatus: ResultStatus;
    homeTeamResult: ResultOutcome;
}
