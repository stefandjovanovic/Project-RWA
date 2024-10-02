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
exports.CourtController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const court_service_1 = require("../services/court.service");
const court_create_dto_1 = require("../dto/court-create.dto");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const user_entity_1 = require("../../auth/user.entity");
const hall_create_dto_1 = require("../dto/hall-create.dto");
let CourtController = class CourtController {
    constructor(courtService) {
        this.courtService = courtService;
    }
    createCourt(courtCreateDto) {
        return this.courtService.createCourt(courtCreateDto);
    }
    updateCourt(courtCreateDto, id) {
        return this.courtService.updateCourt(courtCreateDto, id);
    }
    deleteCourt(id) {
        return this.courtService.deleteCourt(id);
    }
    createHall(hallCreateDto, user) {
        return this.courtService.createHall(hallCreateDto, user.managerDetails.id);
    }
    updateHall(hallCreateDto, id) {
        return this.courtService.updateHall(hallCreateDto, id);
    }
    deleteHall(id) {
        return this.courtService.deleteHall(id);
    }
    getAllCourts() {
        return this.courtService.getAllCourts();
    }
    getMyHalls(user) {
        return this.courtService.getMyHalls(user.managerDetails.id);
    }
    getCourtEvents(courtId) {
        return this.courtService.getEventsForCourt(courtId);
    }
    getScheduledSlots(id, date) {
        return this.courtService.getScheduledSlots(id, date);
    }
};
exports.CourtController = CourtController;
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [court_create_dto_1.CourtCreateDto]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "createCourt", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [court_create_dto_1.CourtCreateDto, String]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "updateCourt", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "deleteCourt", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.MANAGER]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/hall/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hall_create_dto_1.HallCreateDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "createHall", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.MANAGER]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Put)('/hall/update/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hall_create_dto_1.HallCreateDto, String]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "updateHall", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.MANAGER]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/hall/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "deleteHall", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "getAllCourts", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.MANAGER]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/hall/manager'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "getMyHalls", null);
__decorate([
    (0, common_1.Get)('/hall/events/:courtId'),
    __param(0, (0, common_1.Param)('courtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "getCourtEvents", null);
__decorate([
    (0, common_1.Get)('/scheduled-slots/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourtController.prototype, "getScheduledSlots", null);
exports.CourtController = CourtController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Controller)('court'),
    __metadata("design:paramtypes", [court_service_1.CourtService])
], CourtController);
//# sourceMappingURL=court.controller.js.map