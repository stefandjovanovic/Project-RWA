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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const create_team_dto_1 = require("../dto/create-team.dto");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const user_entity_1 = require("../../auth/user.entity");
const team_service_1 = require("../services/team.service");
const roles_enum_1 = require("../../auth/enums/roles.enum");
let TeamController = class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async getMyTeams(user) {
        return this.teamService.getMyTeams(user.id);
    }
    async createTeam(createTeamDto, user) {
        return this.teamService.createTeam(createTeamDto, user.id);
    }
    async editTeam(createTeamDto, id) {
        return this.teamService.editTeam(createTeamDto, id);
    }
    async deleteTeam(id) {
        return this.teamService.deleteTeam(id);
    }
    async addMember(teamId, username) {
        return this.teamService.addMember(teamId, username);
    }
    async removeMember(teamId, username) {
        return this.teamService.removeMember(teamId, username);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Get)('/my-teams'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getMyTeams", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Patch)('/edit/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "editTeam", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "deleteTeam", null);
__decorate([
    (0, common_1.Post)('/add-member/:teamId/:username'),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)('/remove-member/:teamId/:username'),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "removeMember", null);
exports.TeamController = TeamController = __decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.PLAYER]),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('team'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
//# sourceMappingURL=team.controller.js.map