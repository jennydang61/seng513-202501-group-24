import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { OK, NOT_FOUND } from "../constants/http";

// GET /admin/all - Get all users (no passwords)
export const getAllUsersHandler = catchErrors(async (req, res) => {
    const users = await UserModel.find({ role: "user" }); 
    return res.status(OK).json(users.map((user) => user.omitPassword()));
  });

// DELETE /admin/:id - Delete account
export const deleteUserHandler = catchErrors(async (req, res) => {
    const username = z.string().parse(req.params.id);
    const deleted = await UserModel.findOneAndDelete({
        username 
    });
    appAssert(deleted, NOT_FOUND, "User not found");
    return res.status(OK).json({
        message: "User removed",
    });
});