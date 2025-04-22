import { Router } from "express";
import { getAllUsersHandler, deleteUserHandler } from "../controllers/admin.controller";
import authenticate from "../middleware/authenticate"; 

const adminRoutes = Router();

// prefix: /admin

// GET /admin/all - get all users for the admin page and leaderboard
adminRoutes.get("/all", authenticate, getAllUsersHandler);         // GET /admin/all
adminRoutes.delete("/:id", deleteUserHandler);

export default adminRoutes;