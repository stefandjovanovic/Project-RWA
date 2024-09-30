import { ChallengesService } from '../services/challenges.service';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ChallengeDto } from '../dto/challenge.dto';
import { SubmitResultDto } from '../dto/submit-result.dto';
import { ResultRequestDto } from '../dto/result-request.dto';
export declare class ChallengesController {
    private challengesService;
    constructor(challengesService: ChallengesService);
    getAllChallenges(teamId: string): Promise<ChallengeDto[]>;
    createChallenge(createChallengeDto: CreateChallengeDto): Promise<ChallengeDto>;
    acceptChallenge(challengeId: string): Promise<void>;
    rejectChallenge(challengeId: string): Promise<void>;
    submitResult(submitResultDto: SubmitResultDto): Promise<void>;
    acceptResult(challengeId: string): Promise<void>;
    rejectResult(challengeId: string): Promise<void>;
    getResultRequests(teamId: string): Promise<ResultRequestDto[]>;
}
