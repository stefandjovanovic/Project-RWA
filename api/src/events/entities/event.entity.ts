import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sport } from "../enums/sport.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { Court } from "./court.entity";
import { TimeSlot } from "./time-slot.entity";
import { Team } from "src/teams/entities/team.entity";

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

  @ManyToOne(() => PlayerDetails, player => player.ownEvents)
  owner: PlayerDetails;

  @ManyToMany(() => PlayerDetails, player => player.events)
  @JoinTable()
  participants: PlayerDetails[];

  @ManyToOne(() => Court, court => court.events)
  court: Court;

  @OneToOne(() => TimeSlot, timeSlot => timeSlot.event, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn()
  timeSlot: TimeSlot;

  @Column()
  private: boolean;

  @ManyToOne(() => Team, team => team.privateEvents)
  belongsTeam: Team;

}