// connecting to db

import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // uri from .env file
    console.log("✅ MongoDB Connected!");
  } catch (error) { // error handling
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;