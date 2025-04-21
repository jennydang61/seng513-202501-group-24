import { Router } from "express";
import {
  getUserHandler,
  getAllUsersHandler,
  updateUsernameHandler,
  updatePasswordHandler,
  deleteUserHandler,
} from "../controllers/user.controller";
import authenticate from "../middleware/authenticate"; 

const userRoutes = Router();

// prefix: /user


userRoutes.get("/", authenticate, getUserHandler);         // GET /user
userRoutes.get("/all", authenticate, getAllUsersHandler);  // GET /user/all


userRoutes.put("/username", authenticate, updateUsernameHandler); // PUT /user/username
userRoutes.put("/password", authenticate, updatePasswordHandler); // PUT /user/password


userRoutes.delete("/", authenticate, deleteUserHandler); // DELETE /user

export default userRoutes;
