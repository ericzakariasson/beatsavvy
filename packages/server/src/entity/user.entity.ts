import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  spotifyId: string;

  @Column()
  username: string;

  @Column()
  displayName: string;
}
