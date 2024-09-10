import { Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { UserInfoDto } from './dto/user-info.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/player/details/:id')
    getPlayerDetails(@Param('id') id: string): Promise<PlayerDetailsDto> {
        return this.usersService.getPlayerDetails(id);
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
    

}
