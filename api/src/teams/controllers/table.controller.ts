import { Controller, Get, Param } from '@nestjs/common';
import { TableDataDto } from '../dto/table-data.dto';
import { TableService } from '../services/table.service';
import { TableTeamResultsDto } from '../dto/table-team-results.dto';

@Controller('table')
export class TableController {
    constructor(private tableService: TableService) {}

    @Get('/data')
    getTableData(): Promise<TableDataDto[]> {
        return this.tableService.getTableData();
    }

    @Get('/team-results/:teamId')
    getTeamResults(@Param('teamId') teamId: string): Promise<TableTeamResultsDto[]> {
        return this.tableService.getTeamResults(teamId);
    }

}
