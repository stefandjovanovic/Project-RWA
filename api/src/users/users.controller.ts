import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlayerDetailsDto } from './dto/player-details.dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/player/details/:id')
    getPlayerDetails(@Param('id') id: string): Promise<PlayerDetailsDto> {
        return this.usersService.getPlayerDetails(id);
    }

    @Roles([Role.USER])
    @UseGuards(RolesGuard)
    @Get('/test')
    test() {
        return 'Test';
    }

    

}
