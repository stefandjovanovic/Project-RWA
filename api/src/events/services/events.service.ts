import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { EventDto } from '../dto/event.dto';
import { EventCreateDto } from '../dto/event-create.dto';
import * as Entities from '../entities/event.entity';
import { PlayerDetails } from 'src/users/entities/player-details.entity';
import { Court } from '../entities/court.entity';
import { TimeSlot } from '../entities/time-slot.entity';
import { Console } from 'console';
import { PrivateEventDto } from '../dto/private-event.dto';
import { User } from 'src/auth/user.entity';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(Entities.Event)
        private eventRepository: Repository<Entities.Event>,
        @InjectRepository(Court)
        private courtRepository: Repository<Court>,
        @InjectRepository(PlayerDetails)
        private playerRepository: Repository<PlayerDetails>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>
    ) {}



    async createPublicEvent(eventCreateDto: EventCreateDto, player: PlayerDetails): Promise<EventDto> {
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
        //owner of event
        const owner: PlayerDetails = await this.playerRepository.findOne({
            where:{id: player.id},
            relations: ['ownEvents', 'events', 'user']
        });
        event.owner = owner;
        owner.ownEvents.push(event);
        //court on which it is played
        const court = await this.courtRepository.findOne({
            where: {id: eventCreateDto.courtId},
            relations: ['events', 'timeSlots']
        });
        event.court = court;
        court.events.push(event);
        //participants array
        event.participants = [owner];
        owner.events.push(event);
        //timeslot
        const timeSlot = new TimeSlot();
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

    async deleteEvent(eventId: string, playerId: string): Promise<void> {
        const event = await this.eventRepository.findOneBy({id: eventId});
        if (!event) {
            throw new Error('Event not found');
        }

        if (event.owner.id !== playerId) {
            throw new Error('You are not the owner of this event');
        }

        await this.eventRepository.remove(event);
    }

    async getPublicEvents(courtId: string): Promise<EventDto[]> {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const events = await this.eventRepository.find(
        {where: {
            court: {id: courtId},
            private: false,
            date: MoreThanOrEqual(currentDate)
            },
        relations: {
            participants: true,
            court: true,
            owner: true,
            timeSlot: true
        }
        });

        const eventDtos = await Promise.all(events.map(async event => {
            const owner = await this.playerRepository.findOne({
                where: {id: event.owner.id},
                relations: ['user']
            });
            const participants = await this.playerRepository.find({
                where: {events: {id: event.id}},
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

    async joinEvent(eventId: string, playerId: string): Promise<void> {
        const event = await this.eventRepository.findOne({
            where: {id: eventId},
            relations: ['participants', 'owner']
        });
        const player = await this.playerRepository.findOne({
            where: {id: playerId},
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

    async leaveEvent(eventId: string, playerId: string): Promise<void> {
        const event = await this.eventRepository.findOne({
            where: {id: eventId},
            relations: ['participants', 'owner', 'participants.events']
        });
        if (!event) {
            throw new Error('Event not found');
        }
        if(event.owner.id === playerId){
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

    async getMyEvents(player: PlayerDetails): Promise<EventDto[]> {
        const events = await this.eventRepository.find({
                where: {participants: {id: player.id}},
                relations: ['participants', 'court', 'owner', 'timeSlot']
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
            }
        });
    }

    async getNearbyEvents(userLongitude: number, userLatitude: number): Promise<EventDto[]>{
        const allCourts = await this.courtRepository.find({relations: ['events', 'events.court', 'events.timeSlot', 'events.owner', 'events.participants']});

        const nearbyCourts = allCourts.filter(court => {
            const distance = this.getDistanceInMeters(userLatitude, userLongitude, court.latitude, court.longitude);
            return distance <= 1500;
        });

        const nearbyEvents: Entities.Event[] = [];

        const today = new Date();
        const todayHours = today.getHours();
        today.setUTCHours(0, 0, 0, 0);

        nearbyCourts.forEach(court => {
            court.events.forEach((event: Entities.Event) => {
                const eventDate = event.date;
                eventDate.setUTCHours(0, 0, 0, 0);
                //passed events
                if(eventDate < today){
                    return;
                }
                //events that are today
                if(eventDate.getDate() === today.getDate()
                    && eventDate.getMonth() === today.getMonth()
                    && eventDate.getFullYear() === today.getFullYear()
                    && event.timeSlot.startTime < todayHours){
                    return;
                }
                //full events
                if(event.numOfParticipants >= event.maxParticipants){
                    return;
                }

                nearbyEvents.push(event);
            })
        })

        const eventDtos = await Promise.all(nearbyEvents.map(async event => {
            const owner = await this.playerRepository.findOne({
                where: {id: event.owner.id},
                relations: ['user']
            });
            const participants = await this.playerRepository.find({
                where: {events: {id: event.id}},
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

    private getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number){
        // distance between latitudes
        // and longitudes
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;

        // convert to radians
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;

        // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c * 1000;
    }


    async getPrivateEvents(teamId: string): Promise<PrivateEventDto[]> {
        const events = await this.eventRepository.find({
            where: {private: true, belongsTeam: {id: teamId}},
            relations: ['participants', 'court', 'owner', 'timeSlot', 'belongsTeam']
        });

        const eventDtos = await Promise.all(events.map(async event => {
            const owner = await this.playerRepository.findOne({
                where: {id: event.owner.id},
                relations: ['user']
            });
            const participants = await this.playerRepository.find({
                where: {events: {id: event.id}},
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
        }
        ));
        return eventDtos;      
    }

    async createPrivateEvent(eventCreateDto: EventCreateDto, userId: string, teamId: string): Promise<PrivateEventDto> {
        const user = await this.userRepository.findOne({
            where: {id: userId},
            relations: ['playerDetails', 'playerDetails.ownEvents', 'playerDetails.events']
        });
        if (!user) {
            throw new Error('User not found');
        }
        const team = await this.teamRepository.findOne({
            where: {id: teamId},
            relations: ['privateEvents']
        });
        if (!team) {
            throw new Error('Team not found');
        }
        const event = new Entities.Event();
        event.title = eventCreateDto.title;
        event.description = eventCreateDto.description;
        event.date = eventCreateDto.date;
        event.sport = eventCreateDto.sport;
        event.numOfParticipants = 1;
        event.maxParticipants = eventCreateDto.maxParticipants;
        event.price = eventCreateDto.price;

        //owner of event
        event.owner = user.playerDetails;
        if(!user.playerDetails.ownEvents){
            user.playerDetails.ownEvents = [event];
        }else{
            user.playerDetails.ownEvents.push(event);
        }
        //court on which it is played
        const court = await this.courtRepository.findOne({
            where: {id: eventCreateDto.courtId},
            relations: ['events', 'timeSlots']
        });
        event.court = court;
        court.events.push(event);
        //participants array
        event.participants = [user.playerDetails];
        user.playerDetails.events.push(event);
        //timeslot
        const timeSlot = new TimeSlot();
        timeSlot.startTime = eventCreateDto.startTime;
        timeSlot.endTime = eventCreateDto.endTime;
        timeSlot.date = eventCreateDto.date;
        timeSlot.court = court;
        court.timeSlots.push(timeSlot);
        timeSlot.event = event;
        event.timeSlot = timeSlot;
        //belongs team
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


    }
}}
