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
exports.Challenge = void 0;
const time_slot_entity_1 = require("../../events/entities/time-slot.entity");
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
const challenge_status_enum_1 = require("../enums/challenge-status.enum");
const court_entity_1 = require("../../events/entities/court.entity");
const challenge_result_entity_1 = require("./challenge-result.entity");
let Challenge = class Challenge {
};
exports.Challenge = Challenge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Object)
], Challenge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Challenge.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Challenge.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => court_entity_1.Court, court => court.challenges, { cascade: true }),
    __metadata("design:type", court_entity_1.Court)
], Challenge.prototype, "court", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => time_slot_entity_1.TimeSlot, TimeSlot => TimeSlot.challenge, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", time_slot_entity_1.TimeSlot)
], Challenge.prototype, "timeSlot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, team => team.challengerList, { cascade: true }),
    __metadata("design:type", team_entity_1.Team)
], Challenge.prototype, "challengerTeam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, team => team.challengedList, { cascade: true }),
    __metadata("design:type", team_entity_1.Team)
], Challenge.prototype, "challengedTeam", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Challenge.prototype, "resultSubmited", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => challenge_result_entity_1.ChallengeResult, challengeResult => challengeResult.challenge, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", challenge_result_entity_1.ChallengeResult)
], Challenge.prototype, "challengeResult", void 0);
exports.Challenge = Challenge = __decorate([
    (0, typeorm_1.Entity)()
], Challenge);
//# sourceMappingURL=challenge.entity.js.map