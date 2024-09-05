import { Body, Controller, Post } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<AuthResponseDto> {
        return this.authService.signUp(signUpCredentialsDto);
    }
    @Post('/signin')
    signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<AuthResponseDto> {
        return this.authService.signIn(signInCredentialsDto);
    }
}
