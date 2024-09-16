import { EventsService } from '../services/events.service';
import { EventDto } from '../dto/event.dto';
import { User } from 'src/auth/user.entity';
import { EventCreateDto } from '../dto/event-create.dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    createPublicEvent(eventCreateDto: EventCreateDto, user: User): Promise<EventDto>;
    deleteEvent(id: string, user: User): Promise<void>;
    getPublicEvents(courtId: string): Promise<EventDto[]>;
    getMyEvents(user: User): Promise<EventDto[]>;
    joinEvent(id: string, user: User): Promise<void>;
    leaveEvent(id: string, user: User): Promise<void>;
}
