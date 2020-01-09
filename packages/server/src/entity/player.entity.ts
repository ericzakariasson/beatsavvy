import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn("uuid")
  id: number;
}
