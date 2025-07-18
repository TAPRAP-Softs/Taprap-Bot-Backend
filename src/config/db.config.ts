import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
import { DATABASE_URL } from "./variables.config";

export const database = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
