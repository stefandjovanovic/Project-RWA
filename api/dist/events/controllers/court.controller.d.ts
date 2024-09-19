import { CourtService } from '../services/court.service';
import { CourtResponseDto } from '../dto/court-response.dto';
import { CourtCreateDto } from '../dto/court-create.dto';
import { User } from 'src/auth/user.entity';
import { HallCreateDto } from '../dto/hall-create.dto';
import { ScheduledSlotsDto } from '../dto/scheduled-slots.dto';
export declare class CourtController {
    private courtService;
    constructor(courtService: CourtService);
    createCourt(courtCreateDto: CourtCreateDto): Promise<CourtResponseDto>;
    updateCourt(courtCreateDto: CourtCreateDto, id: string): Promise<CourtResponseDto>;
    deleteCourt(id: string): Promise<void>;
    createHall(hallCreateDto: HallCreateDto, user: User): Promise<CourtResponseDto>;
    updateHall(hallCreateDto: HallCreateDto, id: string): Promise<CourtResponseDto>;
    deleteHall(id: string): Promise<void>;
    getAllCourts(): Promise<CourtResponseDto[]>;
    getMyHalls(user: User): Promise<CourtResponseDto[]>;
    getScheduledSlots(id: string, date: string): Promise<ScheduledSlotsDto>;
}
