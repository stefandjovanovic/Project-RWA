import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "./enums/roles.enum";
import { PlayerDetails } from "src/users/entities/player-details.entity";
import { ManagerDetails } from "src/users/entities/manager-details.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: Role;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true }) 
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToOne(() => PlayerDetails, playerDetails => playerDetails.user, { eager: true, cascade: true })
  @JoinColumn()
  playerDetails: PlayerDetails;

  @OneToOne(() => ManagerDetails, managerDetails => managerDetails.user, { eager: true, cascade: true })
  @JoinColumn()
  managerDetails: ManagerDetails;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}