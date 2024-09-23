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
const event_entity_1 = require("../entities/event.entity");
const player_details_entity_1 = require("../../users/entities/player-details.entity");
const court_entity_1 = require("../entities/court.entity");
const time_slot_entity_1 = require("../entities/time-slot.entity");
const user_entity_1 = require("../../auth/user.entity");
const team_entity_1 = require("../../teams/entities/team.entity");
let EventsService = class EventsService {
    constructor(eventRepository, courtRepository, playerRepository, userRepository, teamRepository) {
        this.eventRepository = eventRepository;
        this.courtRepository = courtRepository;
        this.playerRepository = playerRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }
    async createPublicEvent(eventCreateDto, player) {
        const event = new event_entity_1.Event();
        event.title = eventCreateDto.title;
        event.description = eventCreateDto.description;
        event.date = eventCreateDto.date;
        event.sport = eventCreateDto.sport;
        event.numOfParticipants = 1;
        event.maxParticipants = eventCreateDto.maxParticipants;
        event.date = eventCreateDto.date;
        event.price = eventCreateDto.price;
        event.private = false;
        const owner = await this.playerRepository.findOne({
            where: { id: player.id },
            relations: ['ownEvents', 'events', 'user']
        });
        event.owner = owner;
        owner.ownEvents.push(event);
        const court = await this.courtRepository.findOne({
            where: { id: eventCreateDto.courtId },
            relations: ['events', 'timeSlots']
        });
        event.court = court;
        court.events.push(event);
        event.participants = [owner];
        owner.events.push(event);
        const timeSlot = new time_slot_entity_1.TimeSlot();
        timeSlot.startTime = eventCreateDto.startTime;
        timeSlot.endTime = eventCreateDto.endTime;
        timeSlot.date = eventCreateDto.date;
        timeSlot.court = court;
        court.timeSlots.push(timeSlot);
        timeSlot.event = event;
        event.timeSlot = timeSlot;
        await this.playerRepository.save(owner);
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
            eventOwnerUsername: newEvent.owner.user.username,
            participants: newEvent.participants.map(p => p.user.username),
            court: {
                name: newEvent.court.name,
                address: newEvent.court.address,
                longitude: newEvent.court.longitude,
                latitude: newEvent.court.latitude,
                image: newEvent.court.image
            }
        };
    }
    async deleteEvent(eventId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['owner', 'participants', 'court', 'timeSlot']
        });
        if (!event) {
            throw new Error('Event not found');
        }
        await this.eventRepository.remove(event);
    }
    async getPublicEvents(courtId) {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        let events = await this.eventRepository.find({ where: {
                court: { id: courtId },
                private: false,
                date: (0, typeorm_2.MoreThanOrEqual)(currentDate)
            },
            relations: {
                participants: true,
                court: true,
                owner: true,
                timeSlot: true
            }
        });
        const today = new Date();
        const todayHours = today.getHours();
        today.setUTCHours(0, 0, 0, 0);
        events = events.filter(event => {
            const eventDate = event.date;
            eventDate.setUTCHours(0, 0, 0, 0);
            if (eventDate < today) {
                return false;
            }
            if (eventDate.getDate() === today.getDate()
                && eventDate.getMonth() === today.getMonth()
                && eventDate.getFullYear() === today.getFullYear()
                && event.timeSlot.startTime < todayHours) {
                return false;
            }
            return true;
        });
        const eventDtos = await Promise.all(events.map(async (event) => {
            const owner = await this.playerRepository.findOne({
                where: { id: event.owner.id },
                relations: ['user']
            });
            const participants = await this.playerRepository.find({
                where: { events: { id: event.id } },
                relations: ['user']
            });
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
                eventOwnerUsername: owner.user.username,
                participants: participants.map(p => p.user.username),
                court: {
                    name: event.court.name,
                    address: event.court.address,
                    longitude: event.court.longitude,
                    latitude: event.court.latitude,
                    image: event.court.image
                }
            };
        }));
        return eventDtos;
    }
    async joinEvent(eventId, playerId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['participants', 'owner']
        });
        const player = await this.playerRepository.findOne({
            where: { id: playerId },
            relations: ['events']
        });
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
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['participants', 'owner', 'participants.events']
        });
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
        let events = await this.eventRepository.find({
            where: { participants: { id: player.id } },
            relations: ['participants', 'court', 'owner', 'timeSlot']
        });
        const today = new Date();
        const todayHours = today.getHours();
        today.setUTCHours(0, 0, 0, 0);
        events = events.filter(event => {
            const eventDate = event.date;
            eventDate.setUTCHours(0, 0, 0, 0);
            if (eventDate < today) {
                return false;
            }
            if (eventDate.getDate() === today.getDate()
                && eventDate.getMonth() === today.getMonth()
                && eventDate.getFullYear() === today.getFullYear()
                && event.timeSlot.startTime < todayHours) {
                return false;
            }
            return true;
        });
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
                eventOwnerUsername: event.owner.user.username,
                participants: event.participants.map(p => p.user.username),
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
    async getNearbyEvents(userLongitude, userLatitude) {
        const allCourts = await this.courtRepository.find({ relations: ['events', 'events.court', 'events.timeSlot', 'events.owner', 'events.participants'] });
        const nearbyCourts = allCourts.filter(court => {
            const distance = this.getDistanceInMeters(userLatitude, userLongitude, court.latitude, court.longitude);
            return distance <= 1500;
        });
        const nearbyEvents = [];
        const today = new Date();
        const todayHours = today.getHours();
        today.setUTCHours(0, 0, 0, 0);
        nearbyCourts.forEach(court => {
            court.events.forEach((event) => {
                const eventDate = event.date;
                eventDate.setUTCHours(0, 0, 0, 0);
                if (eventDate < today) {
                    return;
                }
                if (eventDate.getDate() === today.getDate()
                    && eventDate.getMonth() === today.getMonth()
                    && eventDate.getFullYear() === today.getFullYear()
                    && event.timeSlot.startTime < todayHours) {
                    return;
                }
                if (event.numOfParticipants >= event.maxParticipants) {
                    return;
                }
                nearbyEvents.push(event);
            });
        });
        const eventDtos = await Promise.all(nearbyEvents.map(async (event) => {
            const owner = await this.playerRepository.findOne({
                where: { id: event.owner.id },
                relations: ['user']
            });
            const participants = await this.playerRepository.find({
                where: { events: { id: event.id } },
                relations: ['user']
            });
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
                eventOwnerUsername: owner.user.username,
                participants: participants.map(p => p.user.username),
                court: {
                    name: event.court.name,
                    address: event.court.address,
                    longitude: event.court.longitude,
                    latitude: event.court.latitude,
                    image: event.court.image
                }
            };
        }));
        return eventDtos;
    }
    getDistanceInMeters(lat1, lon1, lat2, lon2) {
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
        let a = Math.pow(Math.sin(dLat / 2), 2) +
            Math.pow(Math.sin(dLon / 2), 2) *
                Math.cos(lat1) *
                Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c * 1000;
    }
    async getPrivateEvents(teamId) {
        let events = await this.eventRepository.find({
            where: { private: true, belongsTeam: { id: teamId } },
            relations: ['participants', 'court', 'owner', 'timeSlot', 'belongsTeam']
        });
        const today = new Date();
        const todayHours = today.getHours();
        today.setUTCHours(0, 0, 0, 0);
        events = events.filter(event => {
            const eventDate = event.date;
            eventDate.setUTCHours(0, 0, 0, 0);
            if (eventDate < today) {
                return false;
            }
            if (eventDate.getDate() === today.getDate()
                && eventDate.getMonth() === today.getMonth()
                && eventDate.getFullYear() === today.getFullYear()
                && event.timeSlot.startTime < todayHours) {
                return false;
            }
            return true;
        });
        const eventDtos = await Promise.all(events.map(async (event) => {
            const owner = await this.playerRepository.findOne({
                where: { id: event.owner.id },
                relations: ['user']
            });
            const participants = await this.playerRepository.find({
                where: { events: { id: event.id } },
                relations: ['user']
            });
            return {
                id: event.id,
                teamId: event.belongsTeam.id,
                teamName: event.belongsTeam.name,
                description: event.description,
                date: event.date,
                sport: event.sport,
                numOfParticipants: event.numOfParticipants,
                maxParticipants: event.maxParticipants,
                price: event.price,
                startTime: event.timeSlot.startTime,
                endTime: event.timeSlot.endTime,
                eventOwnerUsername: owner.user.username,
                participants: participants.map(p => p.user.username),
                court: {
                    name: event.court.name,
                    address: event.court.address,
                    longitude: event.court.longitude,
                    latitude: event.court.latitude,
                    image: event.court.image
                }
            };
        }));
        return eventDtos;
    }
    async createPrivateEvent(eventCreateDto, userId, teamId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['playerDetails', 'playerDetails.ownEvents', 'playerDetails.events']
        });
        if (!user) {
            throw new Error('User not found');
        }
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
            relations: ['privateEvents']
        });
        if (!team) {
            throw new Error('Team not found');
        }
        const event = new event_entity_1.Event();
        event.title = eventCreateDto.title;
        event.description = eventCreateDto.description;
        event.date = eventCreateDto.date;
        event.sport = eventCreateDto.sport;
        event.numOfParticipants = 1;
        event.maxParticipants = eventCreateDto.maxParticipants;
        event.price = eventCreateDto.price;
        event.owner = user.playerDetails;
        if (!user.playerDetails.ownEvents) {
            user.playerDetails.ownEvents = [event];
        }
        else {
            user.playerDetails.ownEvents.push(event);
        }
        const court = await this.courtRepository.findOne({
            where: { id: eventCreateDto.courtId },
            relations: ['events', 'timeSlots']
        });
        event.court = court;
        court.events.push(event);
        event.participants = [user.playerDetails];
        user.playerDetails.events.push(event);
        const timeSlot = new time_slot_entity_1.TimeSlot();
        timeSlot.startTime = eventCreateDto.startTime;
        timeSlot.endTime = eventCreateDto.endTime;
        timeSlot.date = eventCreateDto.date;
        timeSlot.court = court;
        court.timeSlots.push(timeSlot);
        timeSlot.event = event;
        event.timeSlot = timeSlot;
        event.private = true;
        event.belongsTeam = team;
        team.privateEvents.push(event);
        await this.userRepository.save(user);
        const newEvent = await this.eventRepository.save(event);
        return {
            id: newEvent.id,
            teamId: team.id,
            teamName: team.name,
            description: newEvent.description,
            date: newEvent.date,
            sport: newEvent.sport,
            numOfParticipants: newEvent.numOfParticipants,
            maxParticipants: newEvent.maxParticipants,
            price: newEvent.price,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            eventOwnerUsername: user.username,
            participants: [user.username],
            court: {
                name: court.name,
                address: court.address,
                longitude: court.longitude,
                latitude: court.latitude,
                image: court.image
            }
        };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(2, (0, typeorm_1.InjectRepository)(player_details_entity_1.PlayerDetails)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map