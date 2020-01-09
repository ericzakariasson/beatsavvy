import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { IsEmail } from "class-validator";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: number;

  @Column()
  spotifyId: string;

  @Column()
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  displayName: string;

  @Column()
  refreshToken: string;
}