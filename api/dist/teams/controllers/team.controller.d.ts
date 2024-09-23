import { CreateTeamDto } from '../dto/create-team.dto';
import { User } from 'src/auth/user.entity';
import { TeamDto } from '../dto/team-dto';
import { TeamService } from '../services/team.service';
import { TeamMemberDto } from '../dto/team-member.dto';
export declare class TeamController {
    private teamService;
    constructor(teamService: TeamService);
    getMyTeams(user: User): Promise<TeamDto[]>;
    createTeam(createTeamDto: CreateTeamDto, user: User): Promise<TeamDto>;
    editTeam(createTeamDto: CreateTeamDto, id: string): Promise<TeamDto>;
    deleteTeam(id: string): Promise<void>;
    addMember(teamId: string, username: string): Promise<TeamMemberDto>;
    removeMember(teamId: string, username: string): Promise<void>;
}
