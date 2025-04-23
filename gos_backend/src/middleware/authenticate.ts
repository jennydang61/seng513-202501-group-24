import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/user.model";

const authenticate: RequestHandler = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken as string | undefined; 
        appAssert(
            accessToken, 
            UNAUTHORIZED, 
            "Not authorized", 
            AppErrorCode.InvalidAccessToken
        );

        const { error, payload } = verifyToken(accessToken);
        appAssert(
            payload, 
            UNAUTHORIZED, 
            error === "jwt expired" ? "Token expired" : "Invalid token",
            AppErrorCode.InvalidAccessToken
        )

        const user = await UserModel.findById(payload.userId);
        appAssert(user, UNAUTHORIZED, "User not found");

        req.userId = payload.userId;
        req.sessionId = payload.sessionId;
        req.userRole = user.role; // set the user's role for later use
        next();
    } catch (err) {
        next(err);
    }
}

export default authenticate;