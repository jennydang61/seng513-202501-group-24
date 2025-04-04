import "dotenv/config";
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());

app.get(
    "/health", 
    catchErrors(async (req, res, next) => {
        // throw new Error("Test Error");
        return res.status(200).json({
            status: "🚀 The Game of Stocks Backend Running!"
        });
    })
);

// auth routes
app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
        console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} environment`)
        await connectDB();
    }
)