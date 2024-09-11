import { PlayerDetailsDto } from './dto/player-details.dto';
import { UsersService } from './users.service';
import { UserInfoDto } from './dto/user-info.dto';
import { User } from 'src/auth/user.entity';
import { ReviewDto } from './dto/review.dto';
import { PhotoDto } from './dto/photo.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getPlayerDetails(username: string): Promise<PlayerDetailsDto>;
    addReview(username: string, reviewDto: ReviewDto): Promise<void>;
    editBio(username: string, body: {
        bio: string;
    }): Promise<void>;
    uploadProfilePicture(file: Express.Multer.File, user: User): Promise<PhotoDto>;
    deleteProfilePicture(user: User): Promise<void>;
    getUsersWithRoles(user: User): Promise<UserInfoDto[]>;
    editRolesAdmin(id: string): Promise<UserInfoDto>;
    editRolesPlayer(id: string): Promise<UserInfoDto>;
    editRolesManager(id: string): Promise<UserInfoDto>;
    deleteRoles(id: string): Promise<void>;
    searchUser(username: string): Promise<PlayerDetailsDto[]>;
}
