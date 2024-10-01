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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const team_entity_1 = require("../entities/team.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../auth/user.entity");
let TeamService = class TeamService {
    constructor(teamRepository, userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }
    async getMyTeams(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['playerDetails', 'playerDetails.teams']
        });
        let teams = await this.teamRepository.find({
            relations: ['members', 'members.user']
        });
        teams = teams.filter(team => team.members.find(member => member.id === user.playerDetails.id));
        return teams.map(team => {
            return {
                id: team.id,
                name: team.name,
                sport: team.sport,
                wins: team.wins,
                losses: team.losses,
                draws: team.draws,
                captainUsername: team.captainUsername,
                members: team.members.map(member => {
                    return {
                        userId: member.id,
                        username: member.user.username,
                        firstName: member.user.firstName,
                        lastName: member.user.lastName,
                        profilePicture: member.profilePicture
                    };
                })
            };
        });
    }
    async searchTeams(term) {
        const teams = await this.teamRepository.find({
            where: [
                { name: (0, typeorm_2.ILike)(`%${term}%`) }
            ],
            relations: ['members', 'members.user']
        });
        return teams.map(team => {
            return {
                id: team.id,
                name: team.name,
                sport: team.sport,
                wins: team.wins,
                losses: team.losses,
                draws: team.draws,
                captainUsername: team.captainUsername,
                members: team.members.map(member => {
                    return {
                        userId: member.id,
                        username: member.user.username,
                        firstName: member.user.firstName,
                        lastName: member.user.lastName,
                        profilePicture: member.profilePicture
                    };
                })
            };
        });
    }
    async createTeam(createTeamDto, userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['playerDetails', 'playerDetails.teams', 'playerDetails.captainTeams']
        });
        const team = new team_entity_1.Team();
        team.name = createTeamDto.name;
        team.sport = createTeamDto.sport;
        team.wins = 0;
        team.losses = 0;
        team.draws = 0;
        team.captainUsername = user.username;
        team.captain = user.playerDetails;
        if (user.playerDetails.captainTeams) {
            user.playerDetails.captainTeams.push(team);
        }
        else {
            user.playerDetails.captainTeams = [team];
        }
        team.members = [user.playerDetails];
        if (user.playerDetails.teams) {
            user.playerDetails.teams.push(team);
        }
        else {
            user.playerDetails.teams = [team];
        }
        team.privateEvents = [];
        team.challengedList = [];
        team.challengerList = [];
        await this.userRepository.save(user);
        const savedTeam = await this.teamRepository.save(team);
        return {
            id: savedTeam.id,
            name: savedTeam.name,
            sport: savedTeam.sport,
            wins: savedTeam.wins,
            losses: savedTeam.losses,
            draws: savedTeam.draws,
            captainUsername: savedTeam.captainUsername,
            members: [{
                    userId: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.playerDetails.profilePicture
                }]
        };
    }
    async editTeam(createTeamDto, id) {
        const team = await this.teamRepository.findOne({
            where: { id },
            relations: ['members', 'members.user']
        });
        if (!team) {
            throw new Error('Team not found');
        }
        team.name = createTeamDto.name;
        team.sport = createTeamDto.sport;
        await this.teamRepository.save(team);
        return {
            id: team.id,
            name: team.name,
            sport: team.sport,
            wins: team.wins,
            losses: team.losses,
            draws: team.draws,
            captainUsername: team.captainUsername,
            members: team.members.map(member => {
                return {
                    userId: member.id,
                    username: member.user.username,
                    firstName: member.user.firstName,
                    lastName: member.user.lastName,
                    profilePicture: member.profilePicture
                };
            })
        };
    }
    async deleteTeam(id) {
        const team = await this.teamRepository.findOneBy({ id });
        if (!team) {
            throw new Error('Team not found');
        }
        await this.teamRepository.remove(team);
    }
    async addMember(teamId, username) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
            relations: ['members']
        });
        if (!team) {
            throw new Error('Team not found');
        }
        const user = await this.userRepository.findOne({
            where: { username: username },
            relations: ['playerDetails', 'playerDetails.teams']
        });
        if (!user) {
            throw new Error('User not found');
        }
        console.log(team.members);
        if (team.members.find(member => member.id === user.playerDetails.id)) {
            throw new Error('User already in team');
        }
        team.members.push(user.playerDetails);
        if (user.playerDetails.teams) {
            user.playerDetails.teams.push(team);
        }
        else {
            user.playerDetails.teams = [team];
        }
        await this.teamRepository.save(team);
        await this.userRepository.save(user);
        return {
            userId: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.playerDetails.profilePicture
        };
    }
    async removeMember(teamId, username) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
            relations: ['members']
        });
        if (!team) {
            throw new Error('Team not found');
        }
        const user = await this.userRepository.findOne({
            where: { username: username },
            relations: ['playerDetails', 'playerDetails.teams']
        });
        if (!user) {
            throw new Error('User not found');
        }
        team.members = team.members.filter(member => member.id !== user.playerDetails.id);
        user.playerDetails.teams = user.playerDetails.teams.filter(team => team.id !== teamId);
        await this.teamRepository.save(team);
        await this.userRepository.save(user);
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeamService);
//# sourceMappingURL=team.service.js.map