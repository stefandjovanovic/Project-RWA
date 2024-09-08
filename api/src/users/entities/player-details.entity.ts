import { User } from "src/auth/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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


}