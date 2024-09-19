import { User } from "src/auth/user.entity";
import { Court } from "src/events/entities/court.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ManagerDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.managerDetails, {eager: false})
  user: User;

  @OneToMany(() => Court, court => court.manager)
  courts: Court[];
  
}