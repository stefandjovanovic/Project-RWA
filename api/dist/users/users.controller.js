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
const review_dto_1 = require("./dto/review.dto");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getPlayerDetails(username) {
        return this.usersService.getPlayerDetails(username);
    }
    addReview(username, reviewDto) {
        return this.usersService.addReview(username, reviewDto);
    }
    editBio(username, body) {
        return this.usersService.editBio(username, body.bio);
    }
    uploadProfilePicture(file, user) {
        return this.usersService.uploadProfilePicture(file, user.id);
    }
    deleteProfilePicture(user) {
        return this.usersService.deleteProfilePicture(user.id);
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
    searchUser(username) {
        return this.usersService.searchUser(username);
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
    (0, common_1.Post)('/player/review/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_dto_1.ReviewDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addReview", null);
__decorate([
    (0, common_1.Patch)('/player/bio/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editBio", null);
__decorate([
    (0, common_1.Post)('/player/picture'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Delete)('/player/picture'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteProfilePicture", null);
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
__decorate([
    (0, common_1.Get)('/player/search/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map