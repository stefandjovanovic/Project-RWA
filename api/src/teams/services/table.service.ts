import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { TableDataDto } from '../dto/table-data.dto';
import { TableTeamResultsDto } from '../dto/table-team-results.dto';
import { ChallengeStatus } from '../enums/challenge-status.enum';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
) {}

    async getTableData(): Promise<TableDataDto[]> {
        const teams = await this.teamRepository.find();

        return teams.map(team => {
            return {
                id: team.id,
                name: team.name,
                sport: team.sport,
                wins: team.wins,
                draws: team.draws,
                losses: team.losses,
                points: team.wins * 3 + team.draws
            }
        });
    }

    async getTeamResults(teamId: string): Promise<TableTeamResultsDto[]> {

        const team = await this.teamRepository.findOne({
            where: {id: teamId},
            relations: ['challengerList', 
                'challengedList', 
                'challengerList.court', 
                'challengedList.court', 
                'challengerList.timeSlot', 
                'challengedList.timeSlot',
                'challengerList.challengedTeam',
                'challengerList.challengerTeam',
                'challengedList.challengerTeam',
                'challengedList.challengedTeam',
                'challengerList.challengeResult',
                'challengedList.challengeResult'
            ]
        });

        const teamResults: TableTeamResultsDto[] = team.challengerList
        .filter(challenge => challenge.resultSubmited && challenge.status === ChallengeStatus.ACCEPTED)
        .map(challenge => {
            return {
                challengerTeamName: challenge.challengerTeam.name,
                challengedTeamName: challenge.challengedTeam.name,
                challengerScore: challenge.challengeResult.homeScore,
                challengedScore: challenge.challengeResult.awayScore,
                date: challenge.timeSlot.date,
                courtName: challenge.court.name
            }
        });

        team.challengedList.forEach(challenge => {
            if(challenge.resultSubmited && challenge.status === ChallengeStatus.ACCEPTED){
                teamResults.push({
                    challengerTeamName: challenge.challengerTeam.name,
                    challengedTeamName: challenge.challengedTeam.name,
                    challengerScore: challenge.challengeResult.homeScore,
                    challengedScore: challenge.challengeResult.awayScore,
                    date: challenge.timeSlot.date,
                    courtName: challenge.court.name
                });
            }
        });

        return teamResults.sort((a, b) => b.date.getTime() - a.date.getTime());

    }




}
