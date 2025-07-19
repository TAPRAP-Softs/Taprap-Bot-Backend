import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const AUTH_MAIL = process.env.AUTH_MAIL;
export const AUTH_PASS = process.env.AUTH_PASS;
export const DATABASE_URL = process.env.DATABASE_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const TOKEN_EXPIRY_TIME = process.env.TOKEN_EXPIRY_TIME;
export const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME;
