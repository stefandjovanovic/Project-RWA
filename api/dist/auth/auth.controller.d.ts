import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<AuthResponseDto>;
    signIn(signInCredentialsDto: SignInCredentialsDto): Promise<AuthResponseDto>;
}
