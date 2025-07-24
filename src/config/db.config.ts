import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { DATABASE_URL } from "./variables.config";
import { RefreshToken } from "../entities/refresh-token.entity";
import { Otp } from "../entities/otp.entity";

export const database = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken, Otp],
  migrations: [],
  subscribers: [],
});

export const userRepository = database.getRepository(User);
export const refreshTokenRepository = database.getRepository(RefreshToken);
export const otpRepository = database.getRepository(Otp);
