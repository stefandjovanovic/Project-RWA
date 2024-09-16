import { Sport } from "../enums/sport.enum";
import { ManagerDetails } from "src/users/entities/manager-details.entity";
import { Event } from "./event.entity";
import { TimeSlot } from "./time-slot.entity";
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
    timeSlots: TimeSlot[];
}
