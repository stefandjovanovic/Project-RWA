import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sport } from "../enums/sport.enum";
import { ManagerDetails } from "src/users/entities/manager-details.entity";
import { Event } from "./event.entity";
import { TimeSlot } from "./time-slot.entity";

@Entity()
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column()
  sport: Sport;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  image: string;

  @Column()
  isHall: boolean;

  @Column()
  pricePerHour: number;

  @ManyToOne(() => ManagerDetails, manager => manager.courts, {cascade: true})
  manager: ManagerDetails;

  @OneToMany(() => Event, event => event.court, {cascade: true})
  events: Event[];

  @OneToMany(() => TimeSlot, timeSlot => timeSlot.court, {cascade: true})
  timeSlots: TimeSlot[];


}