import { Event } from "src/events/entities/event.entity";
import { Sport } from "src/events/enums/sport.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Challenge } from "./challenge.entity";

@Unique(['name'])
@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id;

    @Column()
    name: string;

    @Column()
    sport: Sport;

    @Column()
    wins: number;

    @Column()
    losses: number;

    @Column()
    draws: number;

    @ManyToOne(() => PlayerDetails, player => player.captainTeams, {cascade: true})
    captain: PlayerDetails;

    @Column()
    captainUsername: string;

    @ManyToMany(() => PlayerDetails, player => player.teams, {cascade: true})
    @JoinTable()
    members: PlayerDetails[];

    @OneToMany(() => Event, event => event.belongsTeam)
    privateEvents: Event[];

    @OneToMany(() => Challenge, challenge => challenge.challengerTeam)
    challengerList: Challenge[];

    @OneToMany(() => Challenge, challenge => challenge.challengedTeam)
    challengedList: Challenge[];
}