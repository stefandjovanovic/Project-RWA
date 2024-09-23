import { Repository } from 'typeorm';
import { EventDto } from '../dto/event.dto';
import { EventCreateDto } from '../dto/event-create.dto';
import { Event } from '../entities/event.entity';
import { PlayerDetails } from 'src/users/entities/player-details.entity';
import { Court } from '../entities/court.entity';
import { PrivateEventDto } from '../dto/private-event.dto';
import { User } from 'src/auth/user.entity';
import { Team } from 'src/teams/entities/team.entity';
export declare class EventsService {
    private eventRepository;
    private courtRepository;
    private playerRepository;
    private userRepository;
    private teamRepository;
    constructor(eventRepository: Repository<Event>, courtRepository: Repository<Court>, playerRepository: Repository<PlayerDetails>, userRepository: Repository<User>, teamRepository: Repository<Team>);
    createPublicEvent(eventCreateDto: EventCreateDto, player: PlayerDetails): Promise<EventDto>;
    deleteEvent(eventId: string): Promise<void>;
    getPublicEvents(courtId: string): Promise<EventDto[]>;
    joinEvent(eventId: string, playerId: string): Promise<void>;
    leaveEvent(eventId: string, playerId: string): Promise<void>;
    getMyEvents(player: PlayerDetails): Promise<EventDto[]>;
    getNearbyEvents(userLongitude: number, userLatitude: number): Promise<EventDto[]>;
    private getDistanceInMeters;
    getPrivateEvents(teamId: string): Promise<PrivateEventDto[]>;
    createPrivateEvent(eventCreateDto: EventCreateDto, userId: string, teamId: string): Promise<PrivateEventDto>;
}
