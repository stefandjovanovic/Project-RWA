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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("./users.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_enum_1 = require("../auth/enums/roles.enum");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getPlayerDetails(id) {
        return this.usersService.getPlayerDetails(id);
    }
    getUsersWithRoles(user) {
        return this.usersService.getUsersWithRoles(user);
    }
    editRolesAdmin(id) {
        return this.usersService.editRoles(id, roles_enum_1.Role.ADMIN);
    }
    editRolesPlayer(id) {
        return this.usersService.editRoles(id, roles_enum_1.Role.PLAYER);
    }
    editRolesManager(id) {
        return this.usersService.editRoles(id, roles_enum_1.Role.MANAGER);
    }
    deleteRoles(id) {
        return this.usersService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/player/details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPlayerDetails", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/roles'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersWithRoles", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Patch)('/roles/to-admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editRolesAdmin", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Patch)('/roles/to-player/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editRolesPlayer", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Patch)('/roles/to-manager/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editRolesManager", null);
__decorate([
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.ADMIN]),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteRoles", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map