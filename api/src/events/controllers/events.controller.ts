import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventsService } from '../services/events.service';
import { EventDto } from '../dto/event.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EventCreateDto } from '../dto/event-create.dto';

@UseGuards(AuthGuard())
@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Roles([Role.PLAYER])
    @UseGuards(RolesGuard)
    @Post('/public/create')
    createPublicEvent(@Body() eventCreateDto: EventCreateDto, @GetUser() user: User): Promise<EventDto> {
        return this.eventsService.createPublicEvent(eventCreateDto, user.playerDetails);
    }

    @Roles([Role.PLAYER])
    @UseGuards(RolesGuard)
    @Post('/delete/:id')
    deleteEvent(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.eventsService.deleteEvent(id, user.playerDetails.id);
    }

    @Roles([Role.PLAYER])
    @UseGuards(RolesGuard)
    @Get('/public/:courtId')
    getPublicEvents(@Param('courtId') courtId: string): Promise<EventDto[]> {
        return this.eventsService.getPublicEvents(courtId);
    }

    @Roles([Role.PLAYER])
    @UseGuards(RolesGuard)
    @Get('/my')
    getMyEvents(@GetUser() user: User): Promise<EventDto[]> {
        return this.eventsService.getMyEvents(user.playerDetails);
    }

    @Roles([Role.PLAYER])
    @UseGuards(RolesGuard)
    @Post('/join/:id')
    joinEvent(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.eventsService.joinEvent(id, user.playerDetails);
    }

    @Roles([Role.PLAYER])
    @UseGuards(RolesGuard)
    @Post('/leave/:id')
    leaveEvent(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.eventsService.leaveEvent(id, user.playerDetails.id);
    }


}
