import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { EventDto } from '../dto/event.dto';
import { EventCreateDto } from '../dto/event-create.dto';
import * as Entities from '../entities/event.entity';
import { PlayerDetails } from 'src/users/entities/player-details.entity';
import { Court } from '../entities/court.entity';
import { TimeSlot } from '../entities/time-slot.entity';

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(Entities.Event)
        private eventRepository: Repository<Entities.Event>,
        @InjectRepository(Court)
        private courtRepository: Repository<Court>
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
        event.owner = player;
        player.ownEvents.push(event);
        //court on which it is played
        const court = await this.courtRepository.findOneBy({id: eventCreateDto.courtId});
        event.court = court;
        court.events.push(event);
        //participants array
        event.participants = [player];
        player.events.push(event);
        //timeslot
        const timeSlot = new TimeSlot();
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
        currentDate.setHours(0, 0, 0, 0);

        const events = await this.eventRepository.find({where: {
            court: {id: courtId},
            private: false,
            date: MoreThanOrEqual(currentDate)
        }});
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
            }
        });
    }

    async joinEvent(eventId: string, player: PlayerDetails): Promise<void> {
        const event = await this.eventRepository.findOneBy({id: eventId});
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
        const event = await this.eventRepository.findOneBy({id: eventId});
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
            }
        });
    }
}
