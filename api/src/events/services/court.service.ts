import { Injectable } from '@nestjs/common';
import { CourtResponseDto } from '../dto/court-response.dto';
import { CourtCreateDto } from '../dto/court-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Court } from '../entities/court.entity';
import { Repository } from 'typeorm';
import { PlayerDetails } from 'src/users/entities/player-details.entity';
import { ManagerDetails } from 'src/users/entities/manager-details.entity';
import { HallCreateDto } from '../dto/hall-create.dto';
import { GetScheduledSlotsDto } from '../dto/get-scheduled-slots.dto';
import { ScheduledSlotsDto } from '../dto/scheduled-slots.dto';
import { start } from 'repl';

@Injectable()
export class CourtService {
    constructor(
        @InjectRepository(Court)
        private courtRepository: Repository<Court>,
        @InjectRepository(PlayerDetails)
        private playerDetailsRepository: Repository<PlayerDetails>,
        @InjectRepository(ManagerDetails)
        private managerDetailsRepository: Repository<ManagerDetails>
    ) {}


    async createCourt(courtCreateDto: CourtCreateDto): Promise<CourtResponseDto> {
        const court = new Court();
        court.sport = courtCreateDto.sport;
        court.name = courtCreateDto.name;
        court.address = courtCreateDto.address;
        court.longitude = courtCreateDto.longitude;
        court.latitude = courtCreateDto.latitude;
        court.startTime = 0;
        court.endTime = 24;
        court.image = courtCreateDto.image ?? '';
        court.isHall = false;
        court.pricePerHour = 0;
        court.manager = null;
        court.events = [];
        court.timeSlots = [];

        const newCourt = await this.courtRepository.save(court);

        return {
            id: newCourt.id,
            sport: newCourt.sport,
            name: newCourt.name,
            address: newCourt.address,
            longitude: newCourt.longitude,
            latitude: newCourt.latitude,
            startTime: newCourt.startTime,
            endTime: newCourt.endTime,
            image: newCourt.image,
            isHall: newCourt.isHall,
            pricePerHour: newCourt.pricePerHour
        };
    }

    async updateCourt(courtCreateDto: CourtCreateDto, id: string): Promise<CourtResponseDto> {
        const court = await this.courtRepository.findOneBy({id});
        if (!court) {
            throw new Error('Court not found');
        }

        if(court.isHall) {
            throw new Error('Cannot update hall');
        }

        court.sport = courtCreateDto.sport;
        court.name = courtCreateDto.name;
        court.address = courtCreateDto.address;
        court.longitude = courtCreateDto.longitude;
        court.latitude = courtCreateDto.latitude;
        court.image = courtCreateDto.image ?? '';

        const updatedCourt = await this.courtRepository.save(court);
        return {
            id: updatedCourt.id,
            sport: updatedCourt.sport,
            name: updatedCourt.name,
            address: updatedCourt.address,
            longitude: updatedCourt.longitude,
            latitude: updatedCourt.latitude,
            startTime: updatedCourt.startTime,
            endTime: updatedCourt.endTime,
            image: updatedCourt.image,
            isHall: updatedCourt.isHall,
            pricePerHour: updatedCourt.pricePerHour
        }
    }

    async deleteCourt(id: string): Promise<void> {
        const court = await this.courtRepository.findOneBy({id});
        if (!court) {
            throw new Error('Court not found');
        }

        if(court.isHall) {
            throw new Error('Cannot delete hall');
        }

        await this.courtRepository.remove(court);
    }

    async createHall(hallCreateDto: HallCreateDto, managerId: string): Promise<CourtResponseDto> {
        const manager = await this.managerDetailsRepository.findOneBy({id: managerId});

        const court = new Court();
        court.sport = hallCreateDto.sport;
        court.name = hallCreateDto.name;
        court.address = hallCreateDto.address;
        court.longitude = hallCreateDto.longitude;
        court.latitude = hallCreateDto.latitude;
        court.startTime = hallCreateDto.startTime;
        court.endTime = hallCreateDto.endTime;
        court.image = hallCreateDto.image ?? '';
        court.isHall = true;
        court.pricePerHour = hallCreateDto.pricePerHour;
        court.manager = manager;
        court.events = [];
        court.timeSlots = [];
        manager.courts.push(court);

        const newCourt = await this.courtRepository.save(court);

        return {
            id: newCourt.id,
            sport: newCourt.sport,
            name: newCourt.name,
            address: newCourt.address,
            longitude: newCourt.longitude,
            latitude: newCourt.latitude,
            startTime: newCourt.startTime,
            endTime: newCourt.endTime,
            image: newCourt.image,
            isHall: newCourt.isHall,
            pricePerHour: newCourt.pricePerHour
        };
    }

    async updateHall(hallCreateDto: HallCreateDto, id: string): Promise<CourtResponseDto> {
        const court = await this.courtRepository.findOneBy({id});
        if (!court) {
            throw new Error('Court not found');
        }

        if(!court.isHall) {
            throw new Error('Cannot update court');
        }

        court.sport = hallCreateDto.sport;
        court.name = hallCreateDto.name;
        court.address = hallCreateDto.address;
        court.longitude = hallCreateDto.longitude;
        court.latitude = hallCreateDto.latitude;
        court.startTime = hallCreateDto.startTime;
        court.endTime = hallCreateDto.endTime;
        court.image = hallCreateDto.image ?? '';
        court.pricePerHour = hallCreateDto.pricePerHour;

        const updatedCourt = await this.courtRepository.save(court);
        return {
            id: updatedCourt.id,
            sport: updatedCourt.sport,
            name: updatedCourt.name,
            address: updatedCourt.address,
            longitude: updatedCourt.longitude,
            latitude: updatedCourt.latitude,
            startTime: updatedCourt.startTime,
            endTime: updatedCourt.endTime,
            image: updatedCourt.image,
            isHall: updatedCourt.isHall,
            pricePerHour: updatedCourt.pricePerHour
        }
    }

    async deleteHall(id: string): Promise<void> {
        const court = await this.courtRepository.findOneBy({id});
        if (!court) {
            throw new Error('Court not found');
        }

        if(!court.isHall) {
            throw new Error('Cannot delete court');
        }

        await this.courtRepository.remove(court);
    }

    async getAllCourts(): Promise<CourtResponseDto[]> {
        const courts = await this.courtRepository.find();
        return courts.map(court => {
            return {
                id: court.id,
                sport: court.sport,
                name: court.name,
                address: court.address,
                longitude: court.longitude,
                latitude: court.latitude,
                startTime: court.startTime,
                endTime: court.endTime,
                image: court.image,
                isHall: court.isHall,
                pricePerHour: court.pricePerHour
            }
        });
    }

    async getMyHalls(manager: ManagerDetails): Promise<CourtResponseDto[]> {
        const courts = manager.courts;
        return courts.map(court => {
            return {
                id: court.id,
                sport: court.sport,
                name: court.name,
                address: court.address,
                longitude: court.longitude,
                latitude: court.latitude,
                startTime: court.startTime,
                endTime: court.endTime,
                image: court.image,
                isHall: court.isHall,
                pricePerHour: court.pricePerHour
            }
        });
    }

    async getScheduledSlots(getScheduledSlotsDto: GetScheduledSlotsDto): Promise<ScheduledSlotsDto> {
        const court = await this.courtRepository.findOneBy({id: getScheduledSlotsDto.courtId});
        if (!court) {
            throw new Error('Court not found');
        }

        const timeSlots = court.timeSlots.filter(timeSlot => {
            return timeSlot.date === getScheduledSlotsDto.date;
        });

        const events = timeSlots.map(timeSlot => {
            return timeSlot.event;
        });

        return {
            slots: timeSlots.map(timeSlot => {
                return {
                    startTime: timeSlot.startTime,
                    endTime: timeSlot.endTime
                }
            }),
        }
    }
}
