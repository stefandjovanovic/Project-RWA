import { TimeSlot } from "src/events/entities/time-slot.entity";
import { Team } from "./team.entity";
import { ChallengeStatus } from "../enums/challenge-status.enum";
import { Court } from "src/events/entities/court.entity";
import { ChallengeResult } from "./challenge-result.entity";
export declare class Challenge {
    id: any;
    sport: string;
    status: ChallengeStatus;
    court: Court;
    timeSlot: TimeSlot;
    challengerTeam: Team;
    challengedTeam: Team;
    resultSubmited: boolean;
    challengeResult: ChallengeResult;
}
