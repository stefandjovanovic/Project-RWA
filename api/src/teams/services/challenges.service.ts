import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from '../entities/challenge.entity';
import { Repository } from 'typeorm';
import { Court } from 'src/events/entities/court.entity';
import { ChallengeStatus } from '../enums/challenge-status.enum';
import { Team } from '../entities/team.entity';
import { TimeSlot } from 'src/events/entities/time-slot.entity';
import { ChallengeDto } from '../dto/challenge.dto';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ChallengeResult } from '../entities/challenge-result.entity';
import { ResultStatus } from '../enums/result-status.enum';
import { ResultRequestDto } from '../dto/result-request.dto';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        @InjectRepository(Court)
        private courtRepository: Repository<Court>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        @InjectRepository(TimeSlot)
        private timeSlotRepository: Repository<TimeSlot>
    ) {}

    async createChallenge(createChallengeDto: CreateChallengeDto): Promise<ChallengeDto> {
        const challenge = new Challenge();
        challenge.sport = createChallengeDto.sport;
        const court = await this.courtRepository.findOne({
            where: {id: createChallengeDto.courtId},
            relations: ['challenges']
        });
        if(court.challenges){
            court.challenges.push(challenge);
        }else{
            court.challenges = [challenge];
        }
        challenge.court = court;
        const timeSlot = new TimeSlot();
        const date = new Date(createChallengeDto.date);
        date.setUTCHours(0,0,0,0);
        timeSlot.date = date;
        timeSlot.startTime = createChallengeDto.startTime;
        timeSlot.endTime = createChallengeDto.endTime;
        timeSlot.challenge = challenge;
        challenge.timeSlot = timeSlot;

        challenge.status = ChallengeStatus.PENDING;
        challenge.resultSubmited = false;
        challenge.challengeResult = null;

        const challengerTeam = await this.teamRepository.findOne({
            where: {id: createChallengeDto.challengerTeamId},
            relations: ['challengerList', 'challengedList']
        });
        const challengedTeam = await this.teamRepository.findOne({
            where: {id: createChallengeDto.challengedTeamId},
            relations: ['challengerList', 'challengedList']
        });
        if(!challengerTeam || !challengedTeam){
            throw new Error('Invalid team id');
        }

        challengerTeam.challengerList.push(challenge);
        challengedTeam.challengedList.push(challenge);
        challenge.challengerTeam = challengerTeam;
        challenge.challengedTeam = challengedTeam;

        const savedChallenge = await this.challengeRepository.save(challenge);
        
        return{
            id: savedChallenge.id,
            challengerTeamName: challengerTeam.name,
            challengedTeamName: challengedTeam.name,
            sport: savedChallenge.sport,
            status: savedChallenge.status,
            courtName: court.name,
            courtAddress: court.address,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            date: timeSlot.date,
            resultSubmitted: savedChallenge.resultSubmited
        }
    }

    async acceptChallenge(challengeId: string): Promise<void>{
        const challenge = await this.challengeRepository.findOne({where: {id: challengeId}});
        if(!challenge){
            throw new Error('Invalid challenge id');
        }
        challenge.status = ChallengeStatus.ACCEPTED;
        await this.challengeRepository.save(challenge);
    }

    async rejectChallenge(challengeId: string): Promise<void>{
        const challenge = await this.challengeRepository.findOne({where: {id: challengeId}, relations: ['timeSlot']});
        if(!challenge){
            throw new Error('Invalid challenge id');
        }
        
        const timeSlot = await this.timeSlotRepository.findOne({where: {id: challenge.timeSlot.id}});
        challenge.timeSlot = null;
        challenge.status = ChallengeStatus.REJECTED;
        await this.challengeRepository.save(challenge);
        await this.timeSlotRepository.remove(timeSlot);
    }

    async submitResult(challengeId: string, homeScore: number, awayScore: number): Promise<void>{
        const challenge = await this.challengeRepository.findOne({
            where: {id: challengeId},
            relations:['challengeResult']
        });
        if(!challenge){
            throw new Error('Invalid challenge id');
        }
        const challengeResult = new ChallengeResult();
        challengeResult.homeScore = homeScore;
        challengeResult.awayScore = awayScore;
        challengeResult.createdAt = new Date();
        challengeResult.resultStatus = ResultStatus.PENDING;
        challengeResult.challenge = challenge;

        challenge.resultSubmited = true;
        challenge.challengeResult = challengeResult;
        
        await this.challengeRepository.save(challenge);
    }

    async rejectResult(challengeId: string): Promise<void>{
        const challenge = await this.challengeRepository.findOne({
            where: {id: challengeId},
            relations:['challengeResult']
        });
        if(!challenge){
            throw new Error('Invalid challenge id');
        }
        challenge.challengeResult.resultStatus = ResultStatus.REJECTED;
        await this.challengeRepository.save(challenge);
    }

    async acceptResult(challengeId: string): Promise<void>{
        const challenge = await this.challengeRepository.findOne({
            where: {id: challengeId},
            relations:['challengeResult', 'challengerTeam', 'challengedTeam']
        });
        if(!challenge){
            throw new Error('Invalid challenge id');
        }
        challenge.challengeResult.resultStatus = ResultStatus.ACCEPTED;
        await this.challengeRepository.save(challenge);
        //update team stats
        const challengerTeam = await this.teamRepository.findOne({where: {id: challenge.challengerTeam.id}});
        const challengedTeam = await this.teamRepository.findOne({where: {id: challenge.challengedTeam.id}});
        if(challenge.challengeResult.homeScore === challenge.challengeResult.awayScore){
            challengerTeam.draws++;
            challengedTeam.draws++;
        }else if (challenge.challengeResult.homeScore > challenge.challengeResult.awayScore){
            challengerTeam.wins++;
            challengedTeam.losses++;
        }else {
            challengerTeam.losses++;
            challengedTeam.wins++;
        }
        await this.teamRepository.save(challengerTeam);
        await this.teamRepository.save(challengedTeam);
    }

    async getAllChallenges(teamId: string): Promise<ChallengeDto[]>{
        const team = await this.teamRepository.findOne({
            where: {id: teamId},
            relations: ['challengerList',
                'challengedList',
                'challengerList.timeSlot',
                'challengedList.timeSlot', 
                'challengerList.court', 
                'challengedList.court',
                'challengerList.challengerTeam', 
                'challengerList.challengedTeam',
                'challengedList.challengerTeam', 
                'challengedList.challengedTeam']
        });
        if(!team){
            throw new Error('Invalid team id');
        }
        const allChallenges = team.challengerList.concat(team.challengedList);
        // allChallenges.sort((a, b) => {
        //     return a.timeSlot.date.getTime() - b.timeSlot.date.getTime();
        // });
        return allChallenges.map(challenge => {
            if(challenge.status === ChallengeStatus.REJECTED){
                return{
                    id: challenge.id,
                    challengerTeamName: challenge.challengerTeam.name,
                    challengedTeamName: challenge.challengedTeam.name,
                    sport: challenge.sport,
                    status: challenge.status,
                    courtName: challenge.court.name,
                    courtAddress: challenge.court.address,
                    startTime: -1,
                    endTime: -1,
                    date: new Date(),
                    resultSubmitted: challenge.resultSubmited
                }
            }else{
                return{
                    id: challenge.id,
                    challengerTeamName: challenge.challengerTeam.name,
                    challengedTeamName: challenge.challengedTeam.name,
                    sport: challenge.sport,
                    status: challenge.status,
                    courtName: challenge.court.name,
                    courtAddress: challenge.court.address,
                    startTime: challenge.timeSlot.startTime,
                    endTime: challenge.timeSlot.endTime,
                    date: challenge.timeSlot.date,
                    resultSubmitted: challenge.resultSubmited
                }
            }
            
        });
    }

    async getResultRequests(teamId: string): Promise<ResultRequestDto[]>{
        const team = await this.teamRepository.findOne({
            where: {id: teamId},
            relations: ['challengedList', 'challengedList.challengeResult', 'challengedList.court', 'challengedList.timeSlot', 'challengedList.challengerTeam', 'challengedList.challengedTeam']
        });
        if(!team){
            throw new Error('Invalid team id');
        }

        const resultRequests = team.challengedList.filter(challenge => challenge.resultSubmited && challenge.challengeResult.resultStatus === ResultStatus.PENDING);

        return resultRequests.map(challenge => {
            return{
                challengeResultId: challenge.challengeResult.id,
                challengeId: challenge.id,
                challengerTeamName: challenge.challengerTeam.name,
                challengedTeamName: challenge.challengedTeam.name,
                challengerScore: challenge.challengeResult.homeScore,
                challengedScore: challenge.challengeResult.awayScore,
                courtName: challenge.court.name,
                date: challenge.timeSlot.date
            }
        });
    }


}
