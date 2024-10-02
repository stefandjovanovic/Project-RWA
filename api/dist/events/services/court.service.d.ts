import { CourtResponseDto } from '../dto/court-response.dto';
import { CourtCreateDto } from '../dto/court-create.dto';
import { Court } from '../entities/court.entity';
import { Repository } from 'typeorm';
import { PlayerDetails } from 'src/users/entities/player-details.entity';
import { ManagerDetails } from 'src/users/entities/manager-details.entity';
import { HallCreateDto } from '../dto/hall-create.dto';
import { ScheduledSlotsDto } from '../dto/scheduled-slots.dto';
import { EventDto } from '../dto/event.dto';
export declare class CourtService {
    private courtRepository;
    private playerDetailsRepository;
    private managerDetailsRepository;
    constructor(courtRepository: Repository<Court>, playerDetailsRepository: Repository<PlayerDetails>, managerDetailsRepository: Repository<ManagerDetails>);
    createCourt(courtCreateDto: CourtCreateDto): Promise<CourtResponseDto>;
    updateCourt(courtCreateDto: CourtCreateDto, id: string): Promise<CourtResponseDto>;
    deleteCourt(id: string): Promise<void>;
    createHall(hallCreateDto: HallCreateDto, managerId: string): Promise<CourtResponseDto>;
    updateHall(hallCreateDto: HallCreateDto, id: string): Promise<CourtResponseDto>;
    deleteHall(id: string): Promise<void>;
    getAllCourts(): Promise<CourtResponseDto[]>;
    getMyHalls(managerId: string): Promise<CourtResponseDto[]>;
    getScheduledSlots(id: string, dateString: string): Promise<ScheduledSlotsDto>;
    getEventsForCourt(courtId: string): Promise<EventDto[]>;
}
