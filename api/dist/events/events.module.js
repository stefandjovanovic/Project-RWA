"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_controller_1 = require("./controllers/events.controller");
const court_controller_1 = require("./controllers/court.controller");
const court_service_1 = require("./services/court.service");
const events_service_1 = require("./services/events.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const court_entity_1 = require("./entities/court.entity");
const event_entity_1 = require("./entities/event.entity");
const teams_module_1 = require("../teams/teams.module");
const time_slot_entity_1 = require("./entities/time-slot.entity");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        controllers: [events_controller_1.EventsController, court_controller_1.CourtController],
        providers: [court_service_1.CourtService, events_service_1.EventsService],
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([court_entity_1.Court, event_entity_1.Event, time_slot_entity_1.TimeSlot]),
            (0, common_1.forwardRef)(() => teams_module_1.TeamsModule),
        ],
        exports: [typeorm_1.TypeOrmModule.forFeature([court_entity_1.Court, event_entity_1.Event, time_slot_entity_1.TimeSlot])],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map