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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeResult = void 0;
const typeorm_1 = require("typeorm");
const challenge_entity_1 = require("./challenge.entity");
const result_status_enum_1 = require("../enums/result-status.enum");
const result_outcome_enum_1 = require("../enums/result-outcome.enum");
let ChallengeResult = class ChallengeResult {
};
exports.ChallengeResult = ChallengeResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Object)
], ChallengeResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => challenge_entity_1.Challenge, challenge => challenge.challengeResult),
    __metadata("design:type", challenge_entity_1.Challenge)
], ChallengeResult.prototype, "challenge", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChallengeResult.prototype, "homeScore", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChallengeResult.prototype, "awayScore", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ChallengeResult.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChallengeResult.prototype, "resultStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChallengeResult.prototype, "homeTeamResult", void 0);
exports.ChallengeResult = ChallengeResult = __decorate([
    (0, typeorm_1.Entity)()
], ChallengeResult);
//# sourceMappingURL=challenge-result.entity.js.map