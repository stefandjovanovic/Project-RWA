import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Court } from "./court.entity";
import { Event } from "./event.entity";

@Entity()
export class TimeSlot{
    @PrimaryGeneratedColumn('uuid')
    id;

    @Column()
    date: Date;

    @Column()
    startTime: number;

    @Column()
    endTime: number;

    @ManyToOne(() => Court, court => court.timeSlots)
    court: Court;

    @OneToOne(() => Event, event => event.timeSlot)
    event: Event;

}