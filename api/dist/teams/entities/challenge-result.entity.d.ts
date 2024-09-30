import { Challenge } from "./challenge.entity";
import { ResultStatus } from "../enums/result-status.enum";
export declare class ChallengeResult {
    id: any;
    challenge: Challenge;
    homeScore: number;
    awayScore: number;
    createdAt: Date;
    resultStatus: ResultStatus;
}
