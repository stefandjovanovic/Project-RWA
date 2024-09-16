import { Court } from "./court.entity";
import { Event } from "./event.entity";
export declare class TimeSlot {
    id: any;
    date: Date;
    startTime: number;
    endTime: number;
    court: Court;
    event: Event;
}
