import { PlayerDetailsDto } from './dto/player-details.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getPlayerDetails(id: string): Promise<PlayerDetailsDto>;
    test(): string;
}
