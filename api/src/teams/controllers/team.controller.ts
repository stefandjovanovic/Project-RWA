import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { create } from 'domain';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateTeamDto } from '../dto/create-team.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { TeamDto } from '../dto/team-dto';
import { TeamService } from '../services/team.service';
import { Role } from 'src/auth/enums/roles.enum';
import { TeamMemberDto } from '../dto/team-member.dto';

@Roles([Role.PLAYER])
@UseGuards(AuthGuard(), RolesGuard)
@Controller('team')
export class TeamController {

    constructor(private teamService: TeamService) {}

    @Get('/my-teams')
    async getMyTeams(@GetUser() user: User): Promise<TeamDto[]> {
        return this.teamService.getMyTeams(user.id);
    }

    @Get('search/:term')
    async searchTeams(@Param('term') term: string): Promise<TeamDto[]> {
        return this.teamService.searchTeams(term);
    }

    @Post('/create')
    async createTeam(@Body() createTeamDto: CreateTeamDto, @GetUser() user: User): Promise<TeamDto> {
        return this.teamService.createTeam(createTeamDto, user.id);
    }

    @Patch('/edit/:id')
    async editTeam(@Body() createTeamDto: CreateTeamDto, @Param('id') id: string): Promise<TeamDto> {
        return this.teamService.editTeam(createTeamDto, id);
    }

    @Delete('/delete/:id')
    async deleteTeam(@Param('id') id: string): Promise<void> {
        return this.teamService.deleteTeam(id);
    }

    @Post('/add-member/:teamId/:username')
    async addMember(@Param('teamId') teamId: string, @Param('username') username: string): Promise<TeamMemberDto> {
        return this.teamService.addMember(teamId, username);
    }

    @Delete('/remove-member/:teamId/:username')
    async removeMember(@Param('teamId') teamId: string, @Param('username') username: string): Promise<void> {
        return this.teamService.removeMember(teamId, username);
    }

}
