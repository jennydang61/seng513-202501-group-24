import "dotenv/config";
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import stockRoutes from './routes/stockRoutes';
import updateRoutes from "./routes/update.route";
import fundRoutes from "./routes/fund.route";
import adminRoutes from "./routes/admin.route";

import "./utils/cronJobs";
import authorize from './middleware/authorize';


// using express
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

//stock routes
app.use('/stocks', stockRoutes);

// protected routes
app.use("/user", authenticate, userRoutes) // making sure the user is authenticated first before fetching the user
app.use("/update", authenticate, updateRoutes);
app.use("/admin", authenticate, adminRoutes);
app.use("/fund", authenticate, authorize(["admin"]), fundRoutes); // making sure the user is authenticated first before fetching the user

app.use(errorHandler);

app.listen(PORT, async () => {
        console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} environment`)
        await connectDB();
    }
)