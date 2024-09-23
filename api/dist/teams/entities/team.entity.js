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
exports.Team = void 0;
const event_entity_1 = require("../../events/entities/event.entity");
const sport_enum_1 = require("../../events/enums/sport.enum");
const player_details_entity_1 = require("../../users/entities/player-details.entity");
const typeorm_1 = require("typeorm");
const challenge_entity_1 = require("./challenge.entity");
let Team = class Team {
};
exports.Team = Team;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Object)
], Team.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "losses", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "draws", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_details_entity_1.PlayerDetails, player => player.captainTeams),
    __metadata("design:type", player_details_entity_1.PlayerDetails)
], Team.prototype, "captain", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "captainUsername", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => player_details_entity_1.PlayerDetails, player => player.teams),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Team.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, event => event.belongsTeam),
    __metadata("design:type", Array)
], Team.prototype, "privateEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => challenge_entity_1.Challenge, challenge => challenge.challengerTeam),
    __metadata("design:type", Array)
], Team.prototype, "challengerList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => challenge_entity_1.Challenge, challenge => challenge.challengedTeam),
    __metadata("design:type", Array)
], Team.prototype, "challengedList", void 0);
exports.Team = Team = __decorate([
    (0, typeorm_1.Unique)(['name']),
    (0, typeorm_1.Entity)()
], Team);
//# sourceMappingURL=team.entity.js.map