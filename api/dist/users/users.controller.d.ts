import { PlayerDetailsDto } from './dto/player-details.dto';
import { UsersService } from './users.service';
import { UserInfoDto } from './dto/user-info.dto';
import { User } from 'src/auth/user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getPlayerDetails(id: string): Promise<PlayerDetailsDto>;
    getUsersWithRoles(user: User): Promise<UserInfoDto[]>;
    editRolesAdmin(id: string): Promise<UserInfoDto>;
    editRolesPlayer(id: string): Promise<UserInfoDto>;
    editRolesManager(id: string): Promise<UserInfoDto>;
    deleteRoles(id: string): Promise<void>;
}
