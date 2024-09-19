import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";
import { Event } from "src/events/entities/event.entity";
import { Team } from "src/teams/entities/team.entity";

@Entity()
export class PlayerDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bio: string;

  @Column()
  profilePicture: string;

  @OneToOne(() => User, user => user.playerDetails, {eager: false})
  user: User;

  @OneToMany(() => Review, review => review.user, {eager: true, cascade: true})
  reviews: Review[];

  @ManyToMany(() => Event, event => event.participants)
  events: Event[];

  @OneToMany(() => Event, event => event.owner)
  ownEvents: Event[];

  @OneToMany(() => Team, team => team.captain)
  captainTeams: Team[];

  @ManyToMany(() => Team, team => team.members)
  teams: Team[];


}