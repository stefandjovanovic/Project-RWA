import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Challenge } from "./challenge.entity";
import { ResultStatus } from "../enums/result-status.enum";


@Entity()
export class ChallengeResult {
    @PrimaryGeneratedColumn('uuid')
    id;

    @OneToOne(() => Challenge, challenge => challenge.challengeResult)
    challenge: Challenge;

    @Column()
    homeScore: number;

    @Column()
    awayScore: number;

    @Column()
    createdAt: Date;

    @Column()
    resultStatus: ResultStatus;

}