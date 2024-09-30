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
exports.ChallengesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const challenges_service_1 = require("../services/challenges.service");
const create_challenge_dto_1 = require("../dto/create-challenge.dto");
const submit_result_dto_1 = require("../dto/submit-result.dto");
let ChallengesController = class ChallengesController {
    constructor(challengesService) {
        this.challengesService = challengesService;
    }
    async getAllChallenges(teamId) {
        return this.challengesService.getAllChallenges(teamId);
    }
    async createChallenge(createChallengeDto) {
        return this.challengesService.createChallenge(createChallengeDto);
    }
    async acceptChallenge(challengeId) {
        return this.challengesService.acceptChallenge(challengeId);
    }
    async rejectChallenge(challengeId) {
        return this.challengesService.rejectChallenge(challengeId);
    }
    async submitResult(submitResultDto) {
        return this.challengesService.submitResult(submitResultDto.challengeId, submitResultDto.homeScore, submitResultDto.awayScore);
    }
    async acceptResult(challengeId) {
        return this.challengesService.acceptResult(challengeId);
    }
    async rejectResult(challengeId) {
        return this.challengesService.rejectResult(challengeId);
    }
    async getResultRequests(teamId) {
        return this.challengesService.getResultRequests(teamId);
    }
};
exports.ChallengesController = ChallengesController;
__decorate([
    (0, common_1.Get)('/all/:teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getAllChallenges", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_challenge_dto_1.CreateChallengeDto]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "createChallenge", null);
__decorate([
    (0, common_1.Post)('/accept/:challengeId'),
    __param(0, (0, common_1.Param)('challengeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "acceptChallenge", null);
__decorate([
    (0, common_1.Post)('/reject/:challengeId'),
    __param(0, (0, common_1.Param)('challengeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "rejectChallenge", null);
__decorate([
    (0, common_1.Post)('/result/submit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_result_dto_1.SubmitResultDto]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "submitResult", null);
__decorate([
    (0, common_1.Post)('/result/accept/:challengeId'),
    __param(0, (0, common_1.Param)('challengeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "acceptResult", null);
__decorate([
    (0, common_1.Post)('/result/reject/:challengeId'),
    __param(0, (0, common_1.Param)('challengeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "rejectResult", null);
__decorate([
    (0, common_1.Get)('/result/requests/:teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getResultRequests", null);
exports.ChallengesController = ChallengesController = __decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.PLAYER]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, (0, passport_1.AuthGuard)()),
    (0, common_1.Controller)('challenges'),
    __metadata("design:paramtypes", [challenges_service_1.ChallengesService])
], ChallengesController);
//# sourceMappingURL=challenges.controller.js.map