import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8000;

export const MONGO_URI = process.env.MONGO_URI as string;

export const NODE_ENV = process.env.NODE_ENV as string;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const ACCESS_TOKEN_EXIRES = process.env.ACCESS_TOKEN_EXIRES as string;

export const REFRESH_TOKEN_EXIRES = process.env.REFRESH_TOKEN_EXIRES as string;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
