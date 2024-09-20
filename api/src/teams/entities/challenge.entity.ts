import { TimeSlot } from "src/events/entities/time-slot.entity";
import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";
import { ChallengeStatus } from "../enums/challenge-status.enum";
import { Court } from "src/events/entities/court.entity";
import { ChallengeResult } from "./challenge-result.entity";

@Entity()
export class Challenge {
    @PrimaryGeneratedColumn('uuid')
    id;

    @Column()
    sport: string;

    @Column()
    status: ChallengeStatus;

    @ManyToOne(() => Court, court => court.challenges, {cascade: true})
    court: Court;

    @OneToOne(() => TimeSlot, TimeSlot => TimeSlot.challenge, {cascade: true})
    @JoinColumn()
    timeSlot: TimeSlot;

    @ManyToOne(() => Team, team => team.challengerList, {cascade: true})
    challengerTeam: Team;

    @ManyToOne(() => Team, team => team.challengedList, {cascade: true})
    challengedTeam: Team;

    @Column()
    resultSubmited: boolean;

    @OneToOne(() => ChallengeResult, challengeResult => challengeResult.challenge, {cascade: true})
    @JoinColumn()
    challengeResult: ChallengeResult;

}
