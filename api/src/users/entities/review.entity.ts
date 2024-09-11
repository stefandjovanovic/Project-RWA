import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PlayerDetails } from "./player-details.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comment: string;

    @Column()
    rating: number;

    @Column()
    username: string;

    @ManyToOne(() => PlayerDetails, player => player.reviews, { eager: false })
    user: PlayerDetails;
}