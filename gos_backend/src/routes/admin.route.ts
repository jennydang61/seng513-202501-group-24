import { Router } from "express";
import {
  getAllUsersHandler,
} from "../controllers/user.controller";
import authenticate from "../middleware/authenticate"; 

const adminRoutes = Router();

// prefix: /admin

// GET /admin/all - get all users for the admin page and leaderboard
adminRoutes.get("/all", authenticate, getAllUsersHandler);         // GET /admin/all

export default adminRoutes;