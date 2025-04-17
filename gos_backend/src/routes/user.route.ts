import { Router } from "express";
import { getUserHandler, getAllUsersHandler } from "../controllers/user.controller";


const userRoutes = Router();

// prefix: user
userRoutes.get("/", getUserHandler)
userRoutes.get("/all", getAllUsersHandler)

export default userRoutes;