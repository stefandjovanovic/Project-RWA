import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { Role } from 'src/auth/enums/roles.enum';
import { ReviewDto } from './dto/review.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PhotoDto } from './dto/photo.dto';
export declare class UsersService {
    private userRepository;
    private clodinaryService;
    constructor(userRepository: Repository<User>, clodinaryService: CloudinaryService);
    getPlayerDetails(username: string): Promise<PlayerDetailsDto>;
    addReview(username: string, reviewDto: ReviewDto): Promise<void>;
    editBio(username: string, bio: string): Promise<void>;
    uploadProfilePicture(file: Express.Multer.File, userId: string): Promise<PhotoDto>;
    deleteProfilePicture(userId: string): Promise<void>;
    getUsersWithRoles(appUser: User): Promise<UserInfoDto[]>;
    editRoles(id: string, role: Role): Promise<UserInfoDto>;
    deleteUser(id: string): Promise<void>;
    searchUser(username: string): Promise<PlayerDetailsDto[]>;
}
