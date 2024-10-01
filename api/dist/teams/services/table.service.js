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
exports.TableService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const team_entity_1 = require("../entities/team.entity");
const challenge_status_enum_1 = require("../enums/challenge-status.enum");
let TableService = class TableService {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }
    async getTableData() {
        const teams = await this.teamRepository.find();
        return teams.map(team => {
            return {
                id: team.id,
                name: team.name,
                sport: team.sport,
                wins: team.wins,
                draws: team.draws,
                losses: team.losses,
                points: team.wins * 3 + team.draws
            };
        });
    }
    async getTeamResults(teamId) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
            relations: ['challengerList',
                'challengedList',
                'challengerList.court',
                'challengedList.court',
                'challengerList.timeSlot',
                'challengedList.timeSlot',
                'challengerList.challengedTeam',
                'challengerList.challengerTeam',
                'challengedList.challengerTeam',
                'challengedList.challengedTeam',
                'challengerList.challengeResult',
                'challengedList.challengeResult'
            ]
        });
        const teamResults = team.challengerList
            .filter(challenge => challenge.resultSubmited && challenge.status === challenge_status_enum_1.ChallengeStatus.ACCEPTED)
            .map(challenge => {
            return {
                challengerTeamName: challenge.challengerTeam.name,
                challengedTeamName: challenge.challengedTeam.name,
                challengerScore: challenge.challengeResult.homeScore,
                challengedScore: challenge.challengeResult.awayScore,
                date: challenge.timeSlot.date,
                courtName: challenge.court.name
            };
        });
        team.challengedList.forEach(challenge => {
            if (challenge.resultSubmited && challenge.status === challenge_status_enum_1.ChallengeStatus.ACCEPTED) {
                teamResults.push({
                    challengerTeamName: challenge.challengerTeam.name,
                    challengedTeamName: challenge.challengedTeam.name,
                    challengerScore: challenge.challengeResult.homeScore,
                    challengedScore: challenge.challengeResult.awayScore,
                    date: challenge.timeSlot.date,
                    courtName: challenge.court.name
                });
            }
        });
        return teamResults.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
};
exports.TableService = TableService;
exports.TableService = TableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TableService);
//# sourceMappingURL=table.service.js.map