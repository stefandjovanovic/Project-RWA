"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const challenge_entity_1 = require("../entities/challenge.entity");
const typeorm_2 = require("typeorm");
const court_entity_1 = require("../../events/entities/court.entity");
const challenge_status_enum_1 = require("../enums/challenge-status.enum");
const team_entity_1 = require("../entities/team.entity");
const time_slot_entity_1 = require("../../events/entities/time-slot.entity");
const challenge_result_entity_1 = require("../entities/challenge-result.entity");
const result_status_enum_1 = require("../enums/result-status.enum");
let ChallengesService = class ChallengesService {
    constructor(challengeRepository, courtRepository, teamRepository, timeSlotRepository) {
        this.challengeRepository = challengeRepository;
        this.courtRepository = courtRepository;
        this.teamRepository = teamRepository;
        this.timeSlotRepository = timeSlotRepository;
    }
    async createChallenge(createChallengeDto) {
        const challenge = new challenge_entity_1.Challenge();
        challenge.sport = createChallengeDto.sport;
        const court = await this.courtRepository.findOne({
            where: { id: createChallengeDto.courtId },
            relations: ['challenges']
        });
        if (court.challenges) {
            court.challenges.push(challenge);
        }
        else {
            court.challenges = [challenge];
        }
        challenge.court = court;
        const timeSlot = new time_slot_entity_1.TimeSlot();
        const date = new Date(createChallengeDto.date);
        date.setUTCHours(0, 0, 0, 0);
        timeSlot.date = date;
        timeSlot.startTime = createChallengeDto.startTime;
        timeSlot.endTime = createChallengeDto.endTime;
        timeSlot.challenge = challenge;
        challenge.timeSlot = timeSlot;
        challenge.status = challenge_status_enum_1.ChallengeStatus.PENDING;
        challenge.resultSubmited = false;
        challenge.challengeResult = null;
        const challengerTeam = await this.teamRepository.findOne({
            where: { id: createChallengeDto.challengerTeamId },
            relations: ['challengerList', 'challengedList']
        });
        const challengedTeam = await this.teamRepository.findOne({
            where: { id: createChallengeDto.challengedTeamId },
            relations: ['challengerList', 'challengedList']
        });
        if (!challengerTeam || !challengedTeam) {
            throw new Error('Invalid team id');
        }
        challengerTeam.challengerList.push(challenge);
        challengedTeam.challengedList.push(challenge);
        challenge.challengerTeam = challengerTeam;
        challenge.challengedTeam = challengedTeam;
        const savedChallenge = await this.challengeRepository.save(challenge);
        return {
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
        };
    }
    async acceptChallenge(challengeId) {
        const challenge = await this.challengeRepository.findOne({ where: { id: challengeId } });
        if (!challenge) {
            throw new Error('Invalid challenge id');
        }
        challenge.status = challenge_status_enum_1.ChallengeStatus.ACCEPTED;
        await this.challengeRepository.save(challenge);
    }
    async rejectChallenge(challengeId) {
        const challenge = await this.challengeRepository.findOne({ where: { id: challengeId }, relations: ['timeSlot'] });
        if (!challenge) {
            throw new Error('Invalid challenge id');
        }
        const timeSlot = await this.timeSlotRepository.findOne({ where: { id: challenge.timeSlot.id } });
        challenge.timeSlot = null;
        challenge.status = challenge_status_enum_1.ChallengeStatus.REJECTED;
        await this.challengeRepository.save(challenge);
        await this.timeSlotRepository.remove(timeSlot);
    }
    async submitResult(challengeId, homeScore, awayScore) {
        const challenge = await this.challengeRepository.findOne({
            where: { id: challengeId },
            relations: ['challengeResult']
        });
        if (!challenge) {
            throw new Error('Invalid challenge id');
        }
        const challengeResult = new challenge_result_entity_1.ChallengeResult();
        challengeResult.homeScore = homeScore;
        challengeResult.awayScore = awayScore;
        challengeResult.createdAt = new Date();
        challengeResult.resultStatus = result_status_enum_1.ResultStatus.PENDING;
        challengeResult.challenge = challenge;
        challenge.resultSubmited = true;
        challenge.challengeResult = challengeResult;
        await this.challengeRepository.save(challenge);
    }
    async rejectResult(challengeId) {
        const challenge = await this.challengeRepository.findOne({
            where: { id: challengeId },
            relations: ['challengeResult']
        });
        if (!challenge) {
            throw new Error('Invalid challenge id');
        }
        challenge.challengeResult.resultStatus = result_status_enum_1.ResultStatus.REJECTED;
        await this.challengeRepository.save(challenge);
    }
    async acceptResult(challengeId) {
        const challenge = await this.challengeRepository.findOne({
            where: { id: challengeId },
            relations: ['challengeResult', 'team']
        });
        if (!challenge) {
            throw new Error('Invalid challenge id');
        }
        challenge.challengeResult.resultStatus = result_status_enum_1.ResultStatus.ACCEPTED;
        await this.challengeRepository.save(challenge);
        const challengerTeam = await this.teamRepository.findOne({ where: { id: challenge.challengerTeam.id } });
        const challengedTeam = await this.teamRepository.findOne({ where: { id: challenge.challengedTeam.id } });
        if (challenge.challengeResult.homeScore === challenge.challengeResult.awayScore) {
            challengerTeam.draws++;
            challengedTeam.draws++;
        }
        else if (challenge.challengeResult.homeScore > challenge.challengeResult.awayScore) {
            challengerTeam.wins++;
            challengedTeam.losses++;
        }
        else {
            challengerTeam.losses++;
            challengedTeam.wins++;
        }
        await this.teamRepository.save(challengerTeam);
        await this.teamRepository.save(challengedTeam);
    }
    async getAllChallenges(teamId) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
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
        if (!team) {
            throw new Error('Invalid team id');
        }
        const allChallenges = team.challengerList.concat(team.challengedList);
        return allChallenges.map(challenge => {
            if (challenge.status === challenge_status_enum_1.ChallengeStatus.REJECTED) {
                return {
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
                };
            }
            else {
                return {
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
                };
            }
        });
    }
    async getResultRequests(teamId) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
            relations: ['challengedList', 'challengedList.challengeResult', 'challengedList.court', 'challengedList.timeSlot', 'challengedList.challengerTeam', 'challengedList.challengedTeam']
        });
        if (!team) {
            throw new Error('Invalid team id');
        }
        const resultRequests = team.challengedList.filter(challenge => challenge.resultSubmited && challenge.challengeResult.resultStatus === result_status_enum_1.ResultStatus.PENDING);
        return resultRequests.map(challenge => {
            return {
                challengeResultId: challenge.challengeResult.id,
                challengeId: challenge.id,
                challengerTeamName: challenge.challengerTeam.name,
                challengedTeamName: challenge.challengedTeam.name,
                challengerScore: challenge.challengeResult.homeScore,
                challengedScore: challenge.challengeResult.awayScore,
                courtName: challenge.court.name,
                date: challenge.timeSlot.date
            };
        });
    }
};
exports.ChallengesService = ChallengesService;
exports.ChallengesService = ChallengesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(challenge_entity_1.Challenge)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(2, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(3, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChallengesService);
//# sourceMappingURL=challenges.service.js.map