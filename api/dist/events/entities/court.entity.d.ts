import { Sport } from "../enums/sport.enum";
import { ManagerDetails } from "src/users/entities/manager-details.entity";
import { Event } from "./event.entity";
import { TimeSlot } from "./time-slot.entity";
import { Challenge } from "src/teams/entities/challenge.entity";
export declare class Court {
    id: any;
    sport: Sport;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    startTime: number;
    endTime: number;
    image: string;
    isHall: boolean;
    pricePerHour: number;
    manager: ManagerDetails;
    events: Event[];
    challenges: Challenge[];
    timeSlots: TimeSlot[];
}
