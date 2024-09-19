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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/user.entity");
const typeorm_2 = require("typeorm");
const player_details_dto_1 = require("./dto/player-details.dto");
const user_info_dto_1 = require("./dto/user-info.dto");
const roles_enum_1 = require("../auth/enums/roles.enum");
const player_details_entity_1 = require("./entities/player-details.entity");
const manager_details_entity_1 = require("./entities/manager-details.entity");
const review_dto_1 = require("./dto/review.dto");
const review_entity_1 = require("./entities/review.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UsersService = class UsersService {
    constructor(userRepository, clodinaryService) {
        this.userRepository = userRepository;
        this.clodinaryService = clodinaryService;
    }
    async getPlayerDetails(username) {
        const user = await this.userRepository.findOneBy({ username });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${username} not found`);
        }
        const playerDetails = new player_details_dto_1.PlayerDetailsDto();
        playerDetails.id = user.id;
        playerDetails.username = user.username;
        playerDetails.email = user.email;
        playerDetails.firstName = user.firstName;
        playerDetails.lastName = user.lastName;
        playerDetails.address = user.address;
        playerDetails.bio = user.playerDetails.bio;
        playerDetails.profilePicture = user.playerDetails.profilePicture;
        playerDetails.reviews = user.playerDetails.reviews.map(review => {
            const reviewDto = new review_dto_1.ReviewDto();
            reviewDto.comment = review.comment;
            reviewDto.rating = review.rating;
            reviewDto.username = review.username;
            return reviewDto;
        });
        return playerDetails;
    }
    async addReview(username, reviewDto) {
        const user = await this.userRepository.findOneBy({ username });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        const review = new review_entity_1.Review();
        review.comment = reviewDto.comment;
        review.rating = reviewDto.rating;
        review.username = reviewDto.username;
        user.playerDetails.reviews.push(review);
        review.user = user.playerDetails;
        await this.userRepository.save(user);
    }
    async editBio(username, bio) {
        const user = await this.userRepository.findOneBy({ username });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        user.playerDetails.bio = bio;
        await this.userRepository.save(user);
    }
    async uploadProfilePicture(file, userId) {
        const uploaded = await this.clodinaryService.uploadImage(file).catch(() => {
            throw new common_1.BadRequestException('Invalid file');
        });
        const user = await this.userRepository.findOneBy({ id: userId });
        user.playerDetails.profilePicture = uploaded.url;
        await this.userRepository.save(user);
        return { photoUrl: uploaded.url };
    }
    async deleteProfilePicture(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        user.playerDetails.profilePicture = '';
        await this.userRepository.save(user);
    }
    async getUsersWithRoles(appUser) {
        const users = await this.userRepository.find();
        return users.reduce((acc, user) => {
            if (appUser.id !== user.id) {
                const userInfo = new user_info_dto_1.UserInfoDto();
                userInfo.id = user.id;
                userInfo.username = user.username;
                userInfo.role = user.role;
                acc.push(userInfo);
            }
            return acc;
        }, []);
    }
    async editRoles(id, role) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${id} not found`);
        }
        if (user.role === role) {
            throw new common_1.BadRequestException(`User with username ${id} has already this role`);
        }
        switch (role) {
            case roles_enum_1.Role.PLAYER:
                {
                    user.role = roles_enum_1.Role.PLAYER;
                    if (!user.playerDetails) {
                        console.log('creating player details');
                        console.log(user);
                        user.playerDetails = new player_details_entity_1.PlayerDetails();
                        user.playerDetails.bio = '';
                        user.playerDetails.profilePicture = '';
                        user.playerDetails.user = user;
                        user.playerDetails.reviews = [];
                        user.playerDetails.events = [];
                        user.playerDetails.ownEvents = [];
                    }
                }
                break;
            case roles_enum_1.Role.ADMIN:
                {
                    user.role = roles_enum_1.Role.ADMIN;
                }
                break;
            case roles_enum_1.Role.MANAGER:
                {
                    user.role = roles_enum_1.Role.MANAGER;
                    if (!user.managerDetails) {
                        user.managerDetails = new manager_details_entity_1.ManagerDetails();
                        user.managerDetails.user = user;
                        user.managerDetails.courts = [];
                    }
                }
                break;
            default: throw new common_1.BadRequestException('Invalid role');
        }
        await this.userRepository.save(user);
        const userInfo = new user_info_dto_1.UserInfoDto();
        userInfo.id = user.id;
        userInfo.username = user.username;
        userInfo.role = user.role;
        return userInfo;
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${id} not found`);
        }
        await this.userRepository.remove(user);
    }
    async searchUser(username) {
        const users = await this.userRepository.find({
            where: {
                username: (0, typeorm_2.ILike)(`%${username}%`),
                role: roles_enum_1.Role.PLAYER
            }
        });
        if (users.length === 0) {
            return [];
        }
        return users.map(user => {
            const playerDetails = new player_details_dto_1.PlayerDetailsDto();
            playerDetails.username = user.username;
            playerDetails.email = user.email;
            playerDetails.firstName = user.firstName;
            playerDetails.lastName = user.lastName;
            playerDetails.address = user.address;
            playerDetails.id = user.id;
            playerDetails.bio = user.playerDetails.bio;
            playerDetails.profilePicture = user.playerDetails.profilePicture;
            return playerDetails;
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], UsersService);
//# sourceMappingURL=users.service.js.map