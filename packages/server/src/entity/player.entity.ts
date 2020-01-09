import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;
}
