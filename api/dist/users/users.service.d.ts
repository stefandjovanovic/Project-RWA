import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { PlayerDetailsDto } from './dto/player-details.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getPlayerDetails(id: string): Promise<PlayerDetailsDto>;
}
