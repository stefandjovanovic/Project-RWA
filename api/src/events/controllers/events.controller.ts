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
import { PrivateEventDto } from '../dto/private-event.dto';

@Roles([Role.PLAYER])
@UseGuards(AuthGuard(), RolesGuard)
@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post('/public/create')
    createPublicEvent(@Body() eventCreateDto: EventCreateDto, @GetUser() user: User): Promise<EventDto> {
        return this.eventsService.createPublicEvent(eventCreateDto, user.playerDetails);
    }

    @Post('/delete/:id')
    deleteEvent(@Param('id') id: string): Promise<void> {
        return this.eventsService.deleteEvent(id);
    }

    @Get('/public/:courtId')
    getPublicEvents(@Param('courtId') courtId: string): Promise<EventDto[]> {
        return this.eventsService.getPublicEvents(courtId);
    }

    @Get('/my')
    getMyEvents(@GetUser() user: User): Promise<EventDto[]> {
        return this.eventsService.getMyEvents(user.playerDetails);
    }

    @Post('/join/:id')
    joinEvent(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.eventsService.joinEvent(id, user.playerDetails.id);
    }

    @Post('/leave/:id')
    leaveEvent(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.eventsService.leaveEvent(id, user.playerDetails.id);
    }

    @Get('/nearby/:longitude/:latitude')
    getNearbyEvents(@Param('longitude') longitude: number, @Param('latitude') latitude: number): Promise<EventDto[]> {
        return this.eventsService.getNearbyEvents(longitude, latitude);
    }

    @Get('/private/:teamId')
    getPrivateEvents(@Param('teamId') teamId: string): Promise<PrivateEventDto[]> {
        return this.eventsService.getPrivateEvents(teamId);
    }

    @Post('/private/create/:teamId')
    createPrivateEvent(
        @Body() eventCreateDto: EventCreateDto,
        @Param('teamId') teamId: string,
        @GetUser() user: User
    ): Promise<PrivateEventDto> {
        return this.eventsService.createPrivateEvent(eventCreateDto, user.id, teamId);
    }


}
