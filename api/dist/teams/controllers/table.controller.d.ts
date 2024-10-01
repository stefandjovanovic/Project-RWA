import { TableDataDto } from '../dto/table-data.dto';
import { TableService } from '../services/table.service';
import { TableTeamResultsDto } from '../dto/table-team-results.dto';
export declare class TableController {
    private tableService;
    constructor(tableService: TableService);
    getTableData(): Promise<TableDataDto[]>;
    getTeamResults(teamId: string): Promise<TableTeamResultsDto[]>;
}
