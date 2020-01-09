import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

dotenv.config();

export const connectionOptions: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.entity.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};
