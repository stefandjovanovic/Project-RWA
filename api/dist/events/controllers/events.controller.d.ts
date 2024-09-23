import { EventsService } from '../services/events.service';
import { EventDto } from '../dto/event.dto';
import { User } from 'src/auth/user.entity';
import { EventCreateDto } from '../dto/event-create.dto';
import { PrivateEventDto } from '../dto/private-event.dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    createPublicEvent(eventCreateDto: EventCreateDto, user: User): Promise<EventDto>;
    deleteEvent(id: string): Promise<void>;
    getPublicEvents(courtId: string): Promise<EventDto[]>;
    getMyEvents(user: User): Promise<EventDto[]>;
    joinEvent(id: string, user: User): Promise<void>;
    leaveEvent(id: string, user: User): Promise<void>;
    getNearbyEvents(longitude: number, latitude: number): Promise<EventDto[]>;
    getPrivateEvents(teamId: string): Promise<PrivateEventDto[]>;
    createPrivateEvent(eventCreateDto: EventCreateDto, teamId: string, user: User): Promise<PrivateEventDto>;
}
