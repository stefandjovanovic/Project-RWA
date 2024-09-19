"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const court_entity_1 = require("../entities/court.entity");
const typeorm_2 = require("typeorm");
const player_details_entity_1 = require("../../users/entities/player-details.entity");
const manager_details_entity_1 = require("../../users/entities/manager-details.entity");
let CourtService = class CourtService {
    constructor(courtRepository, playerDetailsRepository, managerDetailsRepository) {
        this.courtRepository = courtRepository;
        this.playerDetailsRepository = playerDetailsRepository;
        this.managerDetailsRepository = managerDetailsRepository;
    }
    async createCourt(courtCreateDto) {
        const court = new court_entity_1.Court();
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
            pricePerHour: newCourt.pricePerHour,
        };
    }
    async updateCourt(courtCreateDto, id) {
        const court = await this.courtRepository.findOneBy({ id });
        if (!court) {
            throw new Error('Court not found');
        }
        if (court.isHall) {
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
            pricePerHour: updatedCourt.pricePerHour,
        };
    }
    async deleteCourt(id) {
        const court = await this.courtRepository.findOneBy({ id });
        if (!court) {
            throw new Error('Court not found');
        }
        if (court.isHall) {
            throw new Error('Cannot delete hall');
        }
        await this.courtRepository.remove(court);
    }
    async createHall(hallCreateDto, managerId) {
        const manager = await this.managerDetailsRepository.findOneBy({ id: managerId });
        const court = new court_entity_1.Court();
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
        if (!manager.courts) {
            manager.courts = [];
        }
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
            pricePerHour: newCourt.pricePerHour,
        };
    }
    async updateHall(hallCreateDto, id) {
        const court = await this.courtRepository.findOneBy({ id });
        if (!court) {
            throw new Error('Court not found');
        }
        if (!court.isHall) {
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
            pricePerHour: updatedCourt.pricePerHour,
        };
    }
    async deleteHall(id) {
        const court = await this.courtRepository.findOneBy({ id });
        if (!court) {
            throw new Error('Court not found');
        }
        if (!court.isHall) {
            throw new Error('Cannot delete court');
        }
        await this.courtRepository.remove(court);
    }
    async getAllCourts() {
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
            };
        });
    }
    async getMyHalls(managerId) {
        const manager = await this.managerDetailsRepository.findOne({
            where: { id: managerId },
            relations: ['courts']
        });
        if (!manager) {
            throw new Error('Manager not found');
        }
        if (!manager.courts) {
            return [];
        }
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
            };
        });
    }
    async getScheduledSlots(id, dateString) {
        const court = await this.courtRepository.findOne({
            where: { id: id },
            relations: ['timeSlots']
        });
        if (!court) {
            throw new Error('Court not found');
        }
        const date = new Date(dateString);
        date.setUTCHours(0, 0, 0, 0);
        console.log(date);
        const timeSlots = court.timeSlots.filter(timeSlot => {
            const timeSlotDate = new Date(timeSlot.date);
            timeSlotDate.setUTCHours(0, 0, 0, 0);
            console.log(timeSlotDate);
            return (timeSlotDate.getDate === date.getDate && timeSlotDate.getMonth === date.getMonth && timeSlotDate.getFullYear === date.getFullYear);
        });
        console.log(timeSlots);
        return {
            slots: timeSlots.map(timeSlot => {
                return {
                    startTime: timeSlot.startTime,
                    endTime: timeSlot.endTime
                };
            }),
        };
    }
};
exports.CourtService = CourtService;
exports.CourtService = CourtService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(1, (0, typeorm_1.InjectRepository)(player_details_entity_1.PlayerDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(manager_details_entity_1.ManagerDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CourtService);
//# sourceMappingURL=court.service.js.map