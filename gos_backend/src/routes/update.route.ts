import { Router } from "express";
import { updateUserHandler } from "../controllers/update.controller";


const updateRoutes = Router();

// prefix: update
updateRoutes.patch("/", updateUserHandler);

export default updateRoutes;