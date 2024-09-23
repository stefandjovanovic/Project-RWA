import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { User } from 'src/auth/user.entity';
import { TeamDto } from '../dto/team-dto';
import { TeamMemberDto } from '../dto/team-member.dto';
export declare class TeamService {
    private teamRepository;
    private userRepository;
    constructor(teamRepository: Repository<Team>, userRepository: Repository<User>);
    getMyTeams(userId: string): Promise<TeamDto[]>;
    createTeam(createTeamDto: CreateTeamDto, userId: string): Promise<TeamDto>;
    editTeam(createTeamDto: CreateTeamDto, id: string): Promise<TeamDto>;
    deleteTeam(id: string): Promise<void>;
    addMember(teamId: string, username: string): Promise<TeamMemberDto>;
    removeMember(teamId: string, username: string): Promise<void>;
}
