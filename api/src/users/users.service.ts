import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ILike, Like, Repository } from 'typeorm';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { Role } from 'src/auth/enums/roles.enum';
import { PlayerDetails } from './entities/player-details.entity';
import { ManagerDetails } from './entities/manager-details.entity';
import { ReviewDto } from './dto/review.dto';
import { Review } from './entities/review.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PhotoDto } from './dto/photo.dto';
import { UserEventDto } from './dto/user-event.dto';
import { Court } from 'src/events/entities/court.entity';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private clodinaryService: CloudinaryService
    ) {}

    async getPlayerDetails(username: string): Promise<PlayerDetailsDto> {
        const user = await this.userRepository.findOneBy({username});

        if (!user) {
            throw new NotFoundException(`User with ID ${username} not found`);
        }

        const playerDetails = new PlayerDetailsDto();
        playerDetails.id = user.id;
        playerDetails.username = user.username;
        playerDetails.email = user.email;
        playerDetails.firstName = user.firstName;
        playerDetails.lastName = user.lastName;
        playerDetails.address = user.address;
        playerDetails.bio = user.playerDetails.bio;
        playerDetails.profilePicture = user.playerDetails.profilePicture;
        playerDetails.reviews = user.playerDetails.reviews.map(review => {
            const reviewDto = new ReviewDto();
            reviewDto.comment = review.comment;
            reviewDto.rating = review.rating;
            reviewDto.username = review.username;
            return reviewDto;
        });

        return playerDetails;
    }

    async addReview(username: string, reviewDto: ReviewDto): Promise<void> {
        const user = await this.userRepository.findOneBy({username});

        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        const review = new Review();
        review.comment = reviewDto.comment;
        review.rating = reviewDto.rating;
        review.username = reviewDto.username;
        user.playerDetails.reviews.push(review);
        review.user = user.playerDetails;

        await this.userRepository.save(user);
    }

    async editBio(username: string, bio: string): Promise<void> {
        const user = await this.userRepository.findOneBy({username});

        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }

        user.playerDetails.bio = bio;

        await this.userRepository.save(user);
    }

    async uploadProfilePicture(file: Express.Multer.File, userId: string): Promise<PhotoDto> {

        const uploaded = await this.clodinaryService.uploadImage(file).catch(() => {
            throw new BadRequestException('Invalid file');
        });

        const user = await this.userRepository.findOneBy({id: userId});
        user.playerDetails.profilePicture = uploaded.url;
        await this.userRepository.save(user);

        return {photoUrl: uploaded.url};
    }

    async deleteProfilePicture(userId: string): Promise<void> {
        const user = await this.userRepository.findOneBy({id: userId});
        user.playerDetails.profilePicture = '';
        await this.userRepository.save(user);
    }

    async getUsersWithRoles(appUser: User): Promise<UserInfoDto[]> {
        const users: User[] = await this.userRepository.find();

        
        return users.reduce((acc, user) => {
            if (appUser.id !== user.id) {
                const userInfo = new UserInfoDto();
                userInfo.id = user.id;
                userInfo.username = user.username;
                userInfo.role = user.role;
                acc.push(userInfo);
            }
            return acc;
        }, []);

    }

    async editRoles(id: string, role: Role): Promise<UserInfoDto> {
        const user = await this.userRepository.findOneBy({id});

        if (!user) {
            throw new NotFoundException(`User with username ${id} not found`);
        }

        if(user.role === role){
            throw new BadRequestException(`User with username ${id} has already this role`);
        }

        switch(role){
            case Role.PLAYER: {
                user.role = Role.PLAYER;
                if(!user.playerDetails){
                    console.log('creating player details');
                    console.log(user);
                    user.playerDetails = new PlayerDetails();
                    user.playerDetails.bio = '';
                    user.playerDetails.profilePicture = '';
                    user.playerDetails.user = user;
                    user.playerDetails.reviews = [];
                    user.playerDetails.events = [];
                    user.playerDetails.ownEvents = [];
                }
            }
            break;
            case Role.ADMIN: {
                user.role = Role.ADMIN;
            }
            break;
            case Role.MANAGER: {
                user.role = Role.MANAGER;
                if(!user.managerDetails){
                    user.managerDetails = new ManagerDetails();
                    user.managerDetails.user = user;
                    
                    user.managerDetails.courts = [];
                }
            }
            break;
            default: throw new BadRequestException('Invalid role');
        }

        await this.userRepository.save(user);

        const userInfo = new UserInfoDto();
        userInfo.id = user.id;
        userInfo.username = user.username;
        userInfo.role = user.role;

        return userInfo;
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException(`User with username ${id} not found`);
        }
        await this.userRepository.remove(user);
    }

    async searchUser(username: string): Promise<PlayerDetailsDto[]> {
        const users = await this.userRepository.find({
            where: { 
                username: ILike(`%${username}%`),
                role: Role.PLAYER
            }
        });

        if (users.length === 0) {
            return [];
        }


        return users.map(user => {
            const playerDetails = new PlayerDetailsDto();
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

    


}
