import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { UserInfoDto } from './dto/user-info.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ReviewDto } from './dto/review.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoDto } from './dto/photo.dto';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/player/details/:id')
    getPlayerDetails(@Param('id') username: string): Promise<PlayerDetailsDto> {
        return this.usersService.getPlayerDetails(username);
    }

    @Post('/player/review/:username')
    addReview(@Param('username') username: string, @Body() reviewDto: ReviewDto): Promise<void> {
        return this.usersService.addReview(username, reviewDto);
    }

    @Patch('/player/bio/:username')
    editBio(@Param('username') username: string, @Body() body: {bio: string}): Promise<void> {
        return this.usersService.editBio(username, body.bio);
    }

    @Post('/player/picture')
    @UseInterceptors(FileInterceptor('file'))
    uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @GetUser() user: User): Promise<PhotoDto> {
        return this.usersService.uploadProfilePicture(file, user.id);
    }

    @Delete('/player/picture')
    deleteProfilePicture(@GetUser() user: User): Promise<void> {
        return this.usersService.deleteProfilePicture(user.id);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Get('/roles')
    getUsersWithRoles(@GetUser() user: User): Promise<UserInfoDto[]>{
        return this.usersService.getUsersWithRoles(user);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Patch('/roles/to-admin/:id')
    editRolesAdmin(@Param('id') id: string): Promise<UserInfoDto> {
        return this.usersService.editRoles(id, Role.ADMIN);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Patch('/roles/to-player/:id')
    editRolesPlayer(@Param('id') id: string): Promise<UserInfoDto> {
        return this.usersService.editRoles(id, Role.PLAYER);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Patch('/roles/to-manager/:id')
    editRolesManager(@Param('id') id: string): Promise<UserInfoDto> {
        return this.usersService.editRoles(id, Role.MANAGER);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteRoles(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }

    @Get('/player/search/:username')
    searchUser(@Param('username') username: string): Promise<PlayerDetailsDto[]> {
        return this.usersService.searchUser(username);
    }

}
