import { User } from "src/auth/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";

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


}