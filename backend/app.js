import { ENV } from "./configs/envConfig.js";
import connectDB from "./configs/dbConfig.js";

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// APP EXPRESS
const app = express();

// DB CONNECTION
connectDB(ENV.MONGO_URI, ENV.DB_NAME);

// CORS OPTIONS
const corsOptions = {
  origin: ENV.CLIENT_ORIGIN || "http://localhost:8080",
};

// MIDDLEWARES
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// URLS API PREFIX

export default app;
