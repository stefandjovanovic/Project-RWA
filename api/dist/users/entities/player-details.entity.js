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
exports.PlayerDetails = void 0;
const user_entity_1 = require("../../auth/user.entity");
const typeorm_1 = require("typeorm");
const review_entity_1 = require("./review.entity");
const event_entity_1 = require("../../events/entities/event.entity");
const team_entity_1 = require("../../teams/entities/team.entity");
let PlayerDetails = class PlayerDetails {
};
exports.PlayerDetails = PlayerDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlayerDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlayerDetails.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlayerDetails.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.playerDetails, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], PlayerDetails.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.user, { eager: true, cascade: true }),
    __metadata("design:type", Array)
], PlayerDetails.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, event => event.participants),
    __metadata("design:type", Array)
], PlayerDetails.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, event => event.owner),
    __metadata("design:type", Array)
], PlayerDetails.prototype, "ownEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.Team, team => team.captain),
    __metadata("design:type", Array)
], PlayerDetails.prototype, "captainTeams", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => team_entity_1.Team, team => team.members),
    __metadata("design:type", Array)
], PlayerDetails.prototype, "teams", void 0);
exports.PlayerDetails = PlayerDetails = __decorate([
    (0, typeorm_1.Entity)()
], PlayerDetails);
//# sourceMappingURL=player-details.entity.js.map