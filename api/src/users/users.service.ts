import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { Role } from 'src/auth/enums/roles.enum';
import { PlayerDetails } from './entities/player-details.entity';
import { ManagerDetails } from './entities/manager-details.entity';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(PlayerDetails)
        private playerDetailsRepository: Repository<PlayerDetails>,
        @InjectRepository(ManagerDetails)
        private managerDetailsRepository: Repository<ManagerDetails>
    ) {}

    async getPlayerDetails(id: string): Promise<PlayerDetailsDto> {
        const user = await this.userRepository.findOneBy({id});

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const playerDetails = new PlayerDetailsDto();
        playerDetails.playerId = user.id;
        playerDetails.username = user.username;
        playerDetails.email = user.email;
        playerDetails.firstName = user.firstName;
        playerDetails.lastName = user.lastName;
        playerDetails.address = user.address;
        playerDetails.bio = user.playerDetails.bio;
        playerDetails.profilePicture = user.playerDetails.profilePicture;

        return playerDetails;
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


}
