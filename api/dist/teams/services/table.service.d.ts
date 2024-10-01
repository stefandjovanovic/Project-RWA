import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { TableDataDto } from '../dto/table-data.dto';
import { TableTeamResultsDto } from '../dto/table-team-results.dto';
export declare class TableService {
    private teamRepository;
    constructor(teamRepository: Repository<Team>);
    getTableData(): Promise<TableDataDto[]>;
    getTeamResults(teamId: string): Promise<TableTeamResultsDto[]>;
}
