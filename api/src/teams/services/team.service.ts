import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { User } from 'src/auth/user.entity';
import { TeamDto } from '../dto/team-dto';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getMyTeams(userId: string): Promise<TeamDto[]>{
        const user = await this.userRepository.findOne({
            where: {id: userId},
            relations: ['playerDetails', 'playerDetails.teams']
        });

        return user.playerDetails.teams.map(team => {
            return {
                id: team.id,
                name: team.name,
                sport: team.sport,
                wins: team.wins,
                losses: team.losses,
                draws: team.draws,
                captainUsername: team.captainUsername,
                members: team.members.map(member => {
                    return {
                        userId: member.id,
                        username: member.user.username,
                        firstName: member.user.firstName,
                        lastName: member.user.lastName,
                        profilePicture: member.profilePicture
                    }
                })
            }
        });
    }

    async createTeam(createTeamDto: CreateTeamDto, userId: string): Promise<TeamDto>{
        const user = await this.userRepository.findOne({
            where: {id: userId},
            relations: ['playerDetails', 'playerDetails.teams']
        });

        const team = new Team();
        team.name = createTeamDto.name;
        team.sport = createTeamDto.sport;
        team.wins = 0;
        team.losses = 0;
        team.draws = 0;

        team.captainUsername = user.username;
        team.captain = user.playerDetails;
        if(user.playerDetails.captainTeams){
            user.playerDetails.captainTeams.push(team);
        }else{
            user.playerDetails.captainTeams = [team];
        }

        team.members = [user.playerDetails];
        if(user.playerDetails.teams){
            user.playerDetails.teams.push(team);
        }else{
            user.playerDetails.teams = [team];
        }
        team.privateEvents = [];
        team.challengedList = [];
        team.challengerList = [];

        const savedTeam = await this.teamRepository.save(team);

        return {
            id: savedTeam.id,
            name: savedTeam.name,
            sport: savedTeam.sport,
            wins: savedTeam.wins,
            losses: savedTeam.losses,
            draws: savedTeam.draws,
            captainUsername: savedTeam.captainUsername,
            members: [{
                userId: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.playerDetails.profilePicture
            }]
        }
    }

    async editTeam(createTeamDto: CreateTeamDto, id: string): Promise<void>{
        const team = await this.teamRepository.findOneBy({id});
        if(!team){
            throw new Error('Team not found');
        }
        team.name = createTeamDto.name;
        team.sport = createTeamDto.sport;
        await this.teamRepository.save(team);
    }

    async deleteTeam(id: string): Promise<void>{
        const team = await this.teamRepository.findOneBy({id});
        if(!team){
            throw new Error('Team not found');
        }
        await this.teamRepository.remove(team);
    }

    async addMember(teamId: string, username: string): Promise<void>{
        const team = await this.teamRepository.findOne({
            where: {id: teamId},
            relations: ['members']
        });

        if(!team){
            throw new Error('Team not found');
        }

        const user = await this.userRepository.findOne({
            where: {username: username},
            relations: ['playerDetails', 'playerDetails.teams']
        });

        if(!user){
            throw new Error('User not found');
        }

        if(team.members.find(member => member.id === user.playerDetails.id)){
            throw new Error('User already in team');
        }

        team.members.push(user.playerDetails);
        if(user.playerDetails.teams){
            user.playerDetails.teams.push(team);
        }else{
            user.playerDetails.teams = [team];
        }

        await this.teamRepository.save(team);
        await this.userRepository.save(user);
    }

    async removeMember(teamId: string, username: string): Promise<void>{
        const team = await this.teamRepository.findOne({
            where: {id: teamId},
            relations: ['members']
        });

        if(!team){
            throw new Error('Team not found');
        }

        const user = await this.userRepository.findOne({
            where: {username: username},
            relations: ['playerDetails', 'playerDetails.teams']
        });

        if(!user){
            throw new Error('User not found');
        }

        team.members = team.members.filter(member => member.id !== user.playerDetails.id);
        user.playerDetails.teams = user.playerDetails.teams.filter(team => team.id !== teamId);

        await this.teamRepository.save(team);
        await this.userRepository.save(user);
    }

}
