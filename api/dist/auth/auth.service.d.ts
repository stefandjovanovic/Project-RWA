import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<AuthResponseDto>;
    signIn(signInCredentialsDto: SignInCredentialsDto): Promise<AuthResponseDto>;
    validateSignInCredentials(signInCredentialsDto: SignInCredentialsDto): Promise<User>;
    private generateJwtToken;
}
