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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_enum_1 = require("./enums/roles.enum");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let SeedService = class SeedService {
    constructor(userRepostiry) {
        this.userRepostiry = userRepostiry;
    }
    async onModuleInit() {
        await this.seed();
    }
    async seed() {
        const username = 'stefan-admin';
        const foundUser = await this.userRepostiry.findOneBy({ username });
        if (foundUser) {
            return;
        }
        const user = new user_entity_1.User();
        user.username = username;
        const salt = await bcrypt.genSalt();
        user.salt = salt;
        user.password = await bcrypt.hash('Pa$$w0rd', salt);
        user.email = 'stefan@admin.com';
        user.firstName = 'Stefan';
        user.lastName = 'Jovanovic';
        user.address = 'Bulevar Nemanjica 38';
        user.role = roles_enum_1.Role.ADMIN;
        user.managerDetails = null;
        user.playerDetails = null;
        await this.userRepostiry.save(user);
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map