"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const team_controller_1 = require("./controllers/team.controller");
const team_service_1 = require("./services/team.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const events_module_1 = require("../events/events.module");
const typeorm_1 = require("@nestjs/typeorm");
const team_entity_1 = require("./entities/team.entity");
const challenges_controller_1 = require("./controllers/challenges.controller");
const challenges_service_1 = require("./services/challenges.service");
const challenge_entity_1 = require("./entities/challenge.entity");
const challenge_result_entity_1 = require("./entities/challenge-result.entity");
const table_controller_1 = require("./controllers/table.controller");
const table_service_1 = require("./services/table.service");
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [team_controller_1.TeamController, challenges_controller_1.ChallengesController, table_controller_1.TableController],
        providers: [team_service_1.TeamService, challenges_service_1.ChallengesService, table_service_1.TableService],
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            (0, common_1.forwardRef)(() => events_module_1.EventsModule),
            typeorm_1.TypeOrmModule.forFeature([team_entity_1.Team, challenge_entity_1.Challenge, challenge_result_entity_1.ChallengeResult])
        ],
        exports: [typeorm_1.TypeOrmModule.forFeature([team_entity_1.Team, challenge_entity_1.Challenge, challenge_result_entity_1.ChallengeResult])],
    })
], TeamsModule);
//# sourceMappingURL=teams.module.js.map