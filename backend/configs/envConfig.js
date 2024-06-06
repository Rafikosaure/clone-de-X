import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  TOKEN: process.env.TOKEN,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
};
