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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const events_service_1 = require("../services/events.service");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const user_entity_1 = require("../../auth/user.entity");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const event_create_dto_1 = require("../dto/event-create.dto");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    createPublicEvent(eventCreateDto, user) {
        return this.eventsService.createPublicEvent(eventCreateDto, user.playerDetails);
    }
    deleteEvent(id) {
        return this.eventsService.deleteEvent(id);
    }
    getPublicEvents(courtId) {
        return this.eventsService.getPublicEvents(courtId);
    }
    getMyEvents(user) {
        return this.eventsService.getMyEvents(user.playerDetails);
    }
    joinEvent(id, user) {
        return this.eventsService.joinEvent(id, user.playerDetails.id);
    }
    leaveEvent(id, user) {
        return this.eventsService.leaveEvent(id, user.playerDetails.id);
    }
    getNearbyEvents(longitude, latitude) {
        return this.eventsService.getNearbyEvents(longitude, latitude);
    }
    getPrivateEvents(teamId) {
        return this.eventsService.getPrivateEvents(teamId);
    }
    createPrivateEvent(eventCreateDto, teamId, user) {
        return this.eventsService.createPrivateEvent(eventCreateDto, user.id, teamId);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)('/public/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_create_dto_1.EventCreateDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createPublicEvent", null);
__decorate([
    (0, common_1.Post)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.Get)('/public/:courtId'),
    __param(0, (0, common_1.Param)('courtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getPublicEvents", null);
__decorate([
    (0, common_1.Get)('/my'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getMyEvents", null);
__decorate([
    (0, common_1.Post)('/join/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Post)('/leave/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "leaveEvent", null);
__decorate([
    (0, common_1.Get)('/nearby/:longitude/:latitude'),
    __param(0, (0, common_1.Param)('longitude')),
    __param(1, (0, common_1.Param)('latitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getNearbyEvents", null);
__decorate([
    (0, common_1.Get)('/private/:teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getPrivateEvents", null);
__decorate([
    (0, common_1.Post)('/private/create/:teamId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('teamId')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_create_dto_1.EventCreateDto, String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createPrivateEvent", null);
exports.EventsController = EventsController = __decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.PLAYER]),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map