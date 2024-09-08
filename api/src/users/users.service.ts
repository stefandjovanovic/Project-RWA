import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { PlayerDetailsDto } from './dto/player-details.dto';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
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


}
