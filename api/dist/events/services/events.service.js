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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Entities = require("../entities/event.entity");
const court_entity_1 = require("../entities/court.entity");
const time_slot_entity_1 = require("../entities/time-slot.entity");
let EventsService = class EventsService {
    constructor(eventRepository, courtRepository) {
        this.eventRepository = eventRepository;
        this.courtRepository = courtRepository;
    }
    async createPublicEvent(eventCreateDto, player) {
        const event = new Entities.Event();
        event.title = eventCreateDto.title;
        event.description = eventCreateDto.description;
        event.date = eventCreateDto.date;
        event.sport = eventCreateDto.sport;
        event.numOfParticipants = 1;
        event.maxParticipants = eventCreateDto.maxParticipants;
        event.date = eventCreateDto.date;
        event.price = eventCreateDto.price;
        event.private = false;
        event.owner = player;
        player.ownEvents.push(event);
        const court = await this.courtRepository.findOneBy({ id: eventCreateDto.courtId });
        event.court = court;
        court.events.push(event);
        event.participants = [player];
        player.events.push(event);
        const timeSlot = new time_slot_entity_1.TimeSlot();
        timeSlot.startTime = eventCreateDto.startTime;
        timeSlot.endTime = eventCreateDto.endTime;
        timeSlot.date = eventCreateDto.date;
        timeSlot.court = court;
        court.timeSlots.push(timeSlot);
        timeSlot.event = event;
        event.timeSlot = timeSlot;
        const newEvent = await this.eventRepository.save(event);
        return {
            id: newEvent.id,
            title: newEvent.title,
            description: newEvent.description,
            date: newEvent.date,
            sport: newEvent.sport,
            numOfParticipants: newEvent.numOfParticipants,
            maxParticipants: newEvent.maxParticipants,
            price: newEvent.price,
            startTime: newEvent.timeSlot.startTime,
            endTime: newEvent.timeSlot.endTime,
            pariticipants: newEvent.participants.map(p => p.user.username),
            court: {
                name: newEvent.court.name,
                address: newEvent.court.address,
                longitude: newEvent.court.longitude,
                latitude: newEvent.court.latitude,
                image: newEvent.court.image
            }
        };
    }
    async deleteEvent(eventId, playerId) {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.owner.id !== playerId) {
            throw new Error('You are not the owner of this event');
        }
        await this.eventRepository.remove(event);
    }
    async getPublicEvents(courtId) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const events = await this.eventRepository.find({ where: {
                court: { id: courtId },
                private: false,
                date: (0, typeorm_2.MoreThanOrEqual)(currentDate)
            } });
        return events.map(event => {
            return {
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date,
                sport: event.sport,
                numOfParticipants: event.numOfParticipants,
                maxParticipants: event.maxParticipants,
                price: event.price,
                startTime: event.timeSlot.startTime,
                endTime: event.timeSlot.endTime,
                pariticipants: event.participants.map(p => p.user.username),
                court: {
                    name: event.court.name,
                    address: event.court.address,
                    longitude: event.court.longitude,
                    latitude: event.court.latitude,
                    image: event.court.image
                }
            };
        });
    }
    async joinEvent(eventId, player) {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.participants.length >= event.maxParticipants) {
            throw new Error('Event is full');
        }
        if (event.participants.find(p => p.id === player.id)) {
            throw new Error('Player is already a participant');
        }
        event.participants.push(player);
        player.events.push(event);
        event.numOfParticipants++;
        await this.eventRepository.save(event);
    }
    async leaveEvent(eventId, playerId) {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.owner.id === playerId) {
            throw new Error('Owner cannot leave the event');
        }
        const player = event.participants.find(p => p.id === playerId);
        if (!player) {
            throw new Error('Player is not a participant');
        }
        event.participants = event.participants.filter(p => p.id !== playerId);
        player.events = player.events.filter(e => e.id !== eventId);
        event.numOfParticipants--;
        await this.eventRepository.save(event);
    }
    async getMyEvents(player) {
        const events = player.events;
        return events.map(event => {
            return {
                id: event.id,
                title: event.title,
                description: event.description,
                date: event.date,
                sport: event.sport,
                numOfParticipants: event.numOfParticipants,
                maxParticipants: event.maxParticipants,
                price: event.price,
                startTime: event.timeSlot.startTime,
                endTime: event.timeSlot.endTime,
                pariticipants: event.participants.map(p => p.user.username),
                court: {
                    name: event.court.name,
                    address: event.court.address,
                    longitude: event.court.longitude,
                    latitude: event.court.latitude,
                    image: event.court.image
                }
            };
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Entities.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map