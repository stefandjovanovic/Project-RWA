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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("./enums/roles.enum");
const jwt_1 = require("@nestjs/jwt");
const player_details_entity_1 = require("../users/entities/player-details.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(signUpCredentialsDto) {
        const salt = await bcrypt.genSalt();
        const user = new user_entity_1.User();
        user.username = signUpCredentialsDto.username;
        user.email = signUpCredentialsDto.email;
        user.firstName = signUpCredentialsDto.firstName;
        user.lastName = signUpCredentialsDto.lastName;
        user.address = signUpCredentialsDto.address;
        user.role = roles_enum_1.Role.PLAYER;
        user.salt = salt;
        user.playerDetails = new player_details_entity_1.PlayerDetails();
        user.playerDetails.bio = "";
        user.playerDetails.profilePicture = "";
        user.playerDetails.user = user;
        user.managerDetails = null;
        user.password = await bcrypt.hash(signUpCredentialsDto.password, salt);
        try {
            await this.userRepository.save(user);
            const accessToken = this.generateJwtToken(user);
            let profilePicture;
            if (user.playerDetails && user.playerDetails.profilePicture) {
                profilePicture = user.playerDetails.profilePicture;
            }
            else {
                profilePicture = "";
            }
            return { accessToken, profilePicture };
        }
        catch (error) {
            console.log(error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username or email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signIn(signInCredentialsDto) {
        const user = await this.validateSignInCredentials(signInCredentialsDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const accessToken = this.generateJwtToken(user);
        let profilePicture;
        if (user.playerDetails && user.playerDetails.profilePicture) {
            profilePicture = user.playerDetails.profilePicture;
        }
        else {
            profilePicture = "";
        }
        return { accessToken, profilePicture };
    }
    async validateSignInCredentials(signInCredentialsDto) {
        const { email, password } = signInCredentialsDto;
        const user = await this.userRepository.findOneBy({ email });
        if (user && await user.validatePassword(password)) {
            return user;
        }
        else {
            return null;
        }
    }
    generateJwtToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            username: user.username
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map