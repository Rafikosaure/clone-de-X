import { ENV } from "./configs/envConfig.js";
import connectDB from "./configs/dbConfig.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// ROUTES
import routerUser from './routes/userRoutes.js'
import TweetRouter from "./routes/tweetRoutes.js";
import MediaRouter from "./routes/mediaRoutes.js";
import LikeRouter from "./routes/likeRoutes.js";
import PrivateMessageRouter from "./routes/privateMessageRoutes.js";

// APP EXPRESS
const app = express();

// DB CONNECTION
connectDB(ENV.MONGO_URI, ENV.DB_NAME);

// CORS OPTIONS
const corsOptions = {
  origin: ENV.CLIENT_ORIGIN || "http://localhost:8000",
};

// MIDDLEWARES
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// MIDDLEWARE TO ROUTE
app.use('/api/user', routerUser)
app.use("/api/tweet", TweetRouter);
app.use("/api/media", MediaRouter);
app.use("/api/like", LikeRouter);
app.use("/api/message", PrivateMessageRouter);

export default app;
