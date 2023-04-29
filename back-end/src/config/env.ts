import { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const ACCESS_TOKEN_SECRET: Secret = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET: Secret = process.env.REFRESH_TOKEN_SECRET;
