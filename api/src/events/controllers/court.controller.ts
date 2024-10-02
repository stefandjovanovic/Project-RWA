import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourtService } from '../services/court.service';
import { CourtResponseDto } from '../dto/court-response.dto';
import { CourtCreateDto } from '../dto/court-create.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { HallCreateDto } from '../dto/hall-create.dto';
import { GetScheduledSlotsDto } from '../dto/get-scheduled-slots.dto';
import { ScheduledSlotsDto } from '../dto/scheduled-slots.dto';
import { EventDto } from '../dto/event.dto';

@UseGuards(AuthGuard())
@Controller('court')
export class CourtController {
    constructor(private courtService: CourtService) {}
    
    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Post('/create')
    createCourt(@Body() courtCreateDto: CourtCreateDto): Promise<CourtResponseDto> {
        return this.courtService.createCourt(courtCreateDto);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Put('/update/:id')
    updateCourt(@Body() courtCreateDto: CourtCreateDto, @Param('id') id: string): Promise<CourtResponseDto> {
        return this.courtService.updateCourt(courtCreateDto, id);
    }

    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
    @Delete('/delete/:id')
    deleteCourt(@Param('id') id: string): Promise<void> {
        return this.courtService.deleteCourt(id);
    }

    @Roles([Role.MANAGER])
    @UseGuards(RolesGuard)
    @Post('/hall/create')
    createHall(@Body() hallCreateDto: HallCreateDto, @GetUser() user: User): Promise<CourtResponseDto> {
        return this.courtService.createHall(hallCreateDto, user.managerDetails.id);
    }

    @Roles([Role.MANAGER])
    @UseGuards(RolesGuard)
    @Put('/hall/update/:id')
    updateHall(@Body() hallCreateDto: HallCreateDto, @Param('id') id: string): Promise<CourtResponseDto> {
        return this.courtService.updateHall(hallCreateDto, id);
    }

    @Roles([Role.MANAGER])
    @UseGuards(RolesGuard)
    @Delete('/hall/delete/:id')
    deleteHall(@Param('id') id: string): Promise<void> {
        return this.courtService.deleteHall(id);
    }

    @Get('/all')
    getAllCourts(): Promise<CourtResponseDto[]> {
        return this.courtService.getAllCourts();
    }

    @Roles([Role.MANAGER])
    @UseGuards(RolesGuard)
    @Get('/hall/manager')
    getMyHalls(@GetUser() user: User): Promise<CourtResponseDto[]> {
        return this.courtService.getMyHalls(user.managerDetails.id);
    }

    @Get('/hall/events/:courtId')
    getCourtEvents(@Param('courtId') courtId: string): Promise<EventDto[]> {
        return this.courtService.getEventsForCourt(courtId);
    }

    @Get('/scheduled-slots/:id')
    getScheduledSlots(
        @Param('id') id: string,
        @Query('date') date: string
    ): Promise<ScheduledSlotsDto>{
        return this.courtService.getScheduledSlots( id, date);
    }

}
