import { User } from "src/auth/user.entity";
import { Court } from "src/events/entities/court.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ManagerDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.managerDetails, {eager: false})
  user: User;

  @ManyToOne(() => Court, court => court.manager)
  courts: Court[];
  
}