import cron from "node-cron";
import { calculateAndUpdateUserStats } from "../services/userStats.service";

// Schedule the task to run every minute
cron.schedule("* * * * *", async() => {
    console.log("Running cron job: Updating user stats...");
    await calculateAndUpdateUserStats();
});