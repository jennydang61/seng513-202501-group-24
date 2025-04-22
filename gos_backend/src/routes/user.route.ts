import { Router } from "express";
import {
  getUserHandler,
  getAllUsersHandler,
  updateUsernameHandler,
  updatePasswordHandler,
  deleteUserHandler,
  getLeaderboardUsersHandler,
  triggerUserStatsUpdateHandler,
} from "../controllers/user.controller";
import authenticate from "../middleware/authenticate"; 

const userRoutes = Router();

// prefix: /user

userRoutes.get("/", authenticate, getUserHandler);         // GET /user

userRoutes.get("/leaderboard", authenticate, getLeaderboardUsersHandler);  // GET /user/leaderboard
userRoutes.patch("/update-stats", authenticate, triggerUserStatsUpdateHandler);  // GET /user/leaderboard

userRoutes.put("/username", authenticate, updateUsernameHandler); // PUT /user/username
userRoutes.put("/password", authenticate, updatePasswordHandler); // PUT /user/password


userRoutes.delete("/", authenticate, deleteUserHandler); // DELETE /user

export default userRoutes;
