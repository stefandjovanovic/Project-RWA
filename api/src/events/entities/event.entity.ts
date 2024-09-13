import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sport } from "../enums/sport.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { Court } from "./court.entity";
import { TimeSlot } from "./time-slot.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  sport: Sport;

  @Column()
  numOfParticipants: number;

  @Column()
  maxParticipants: number;

  @Column()
  price: number;

  @ManyToOne(() => PlayerDetails, player => player.ownEvents, {cascade: true})
  owner: PlayerDetails;

  @ManyToMany(() => PlayerDetails, player => player.events, {cascade: true})
  @JoinColumn()
  participants: PlayerDetails[];

  @ManyToOne(() => Court, court => court.events)
  court: Court;

  @OneToOne(() => TimeSlot, timeSlot => timeSlot.event, {cascade: true})
  timeSlot: TimeSlot;


  @Column()
  private: boolean;

}