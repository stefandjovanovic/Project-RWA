import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { Role } from './enums/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponseDto } from './dto/auth-response.dto';
import { PlayerDetails } from 'src/users/entities/player-details.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}


    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<AuthResponseDto> {
        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = signUpCredentialsDto.username;
        user.email = signUpCredentialsDto.email;
        user.firstName = signUpCredentialsDto.firstName;
        user.lastName = signUpCredentialsDto.lastName;
        user.address = signUpCredentialsDto.address;
        user.role = Role.PLAYER;
        user.salt = salt;
        //user.playerDetails = null;
        user.playerDetails = new PlayerDetails();
        user.playerDetails.bio = "";
        user.playerDetails.profilePicture = "";
        user.playerDetails.user = user;
        user.playerDetails.reviews = [];
        user.playerDetails.events = [];
        user.playerDetails.ownEvents = [];
        user.managerDetails = null;
        user.password = await bcrypt.hash(signUpCredentialsDto.password, salt);

        try {
            await this.userRepository.save(user);
            const accessToken = this.generateJwtToken(user);
            let profilePicture;
            if(user.playerDetails && user.playerDetails.profilePicture) {
                profilePicture = user.playerDetails.profilePicture;
            } else {
                profilePicture = "";
            }
            return {accessToken, profilePicture};
        } catch (error) {
            console.log(error);
            if(error.code === '23505') {
                throw new ConflictException('Username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }


    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<AuthResponseDto> {
        const user: User = await this.validateSignInCredentials(signInCredentialsDto);

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.generateJwtToken(user);

        let profilePicture;
        if(user.playerDetails && user.playerDetails.profilePicture) {
                profilePicture = user.playerDetails.profilePicture;
        } else {
                profilePicture = "";
        }

        return {accessToken, profilePicture};
    }

    
    async validateSignInCredentials(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
        const {email, password} = signInCredentialsDto;

        const user = await this.userRepository.findOneBy({email});

        if(user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    private generateJwtToken(user: User): string {
        const payload: JwtPayload = { 
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            username: user.username
         };

        return this.jwtService.sign(payload);
    }

}
