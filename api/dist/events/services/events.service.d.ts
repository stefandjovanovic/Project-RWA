import { Repository } from 'typeorm';
import { EventDto } from '../dto/event.dto';
import { EventCreateDto } from '../dto/event-create.dto';
import * as Entities from '../entities/event.entity';
import { PlayerDetails } from 'src/users/entities/player-details.entity';
import { Court } from '../entities/court.entity';
export declare class EventsService {
    private eventRepository;
    private courtRepository;
    constructor(eventRepository: Repository<Entities.Event>, courtRepository: Repository<Court>);
    createPublicEvent(eventCreateDto: EventCreateDto, player: PlayerDetails): Promise<EventDto>;
    deleteEvent(eventId: string, playerId: string): Promise<void>;
    getPublicEvents(courtId: string): Promise<EventDto[]>;
    joinEvent(eventId: string, player: PlayerDetails): Promise<void>;
    leaveEvent(eventId: string, playerId: string): Promise<void>;
    getMyEvents(player: PlayerDetails): Promise<EventDto[]>;
}
