import { Event } from "src/events/entities/event.entity";
import { Sport } from "src/events/enums/sport.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => PlayerDetails, player => player.teams, {cascade: true})
    @JoinTable()
    members: PlayerDetails[];

    @OneToMany(() => Event, event => event.belongsTeam)
    privateEvents: Event[];
}