import { Challenge } from '../entities/challenge.entity';
import { Repository } from 'typeorm';
import { Court } from 'src/events/entities/court.entity';
import { Team } from '../entities/team.entity';
import { TimeSlot } from 'src/events/entities/time-slot.entity';
import { ChallengeDto } from '../dto/challenge.dto';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ResultRequestDto } from '../dto/result-request.dto';
export declare class ChallengesService {
    private challengeRepository;
    private courtRepository;
    private teamRepository;
    private timeSlotRepository;
    constructor(challengeRepository: Repository<Challenge>, courtRepository: Repository<Court>, teamRepository: Repository<Team>, timeSlotRepository: Repository<TimeSlot>);
    createChallenge(createChallengeDto: CreateChallengeDto): Promise<ChallengeDto>;
    acceptChallenge(challengeId: string): Promise<void>;
    rejectChallenge(challengeId: string): Promise<void>;
    submitResult(challengeId: string, homeScore: number, awayScore: number): Promise<void>;
    rejectResult(challengeId: string): Promise<void>;
    acceptResult(challengeId: string): Promise<void>;
    getAllChallenges(teamId: string): Promise<ChallengeDto[]>;
    getResultRequests(teamId: string): Promise<ResultRequestDto[]>;
}
