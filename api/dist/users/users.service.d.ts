import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { Role } from 'src/auth/enums/roles.enum';
import { PlayerDetails } from './entities/player-details.entity';
import { ManagerDetails } from './entities/manager-details.entity';
export declare class UsersService {
    private userRepository;
    private playerDetailsRepository;
    private managerDetailsRepository;
    constructor(userRepository: Repository<User>, playerDetailsRepository: Repository<PlayerDetails>, managerDetailsRepository: Repository<ManagerDetails>);
    getPlayerDetails(id: string): Promise<PlayerDetailsDto>;
    getUsersWithRoles(appUser: User): Promise<UserInfoDto[]>;
    editRoles(id: string, role: Role): Promise<UserInfoDto>;
    deleteUser(id: string): Promise<void>;
}
