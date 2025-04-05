import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT } from "../constants/http";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import appAssert from "../utils/appAssert";

export type CreateAccountParams = {
    username: string;
    password: string;
    userAgent?: string;
}
export const createAccount = async (data:CreateAccountParams) => {
    // verfiy existing user doesn't exist
    const existingUser = await UserModel.exists({
        username: data.username,
    })
    appAssert(!existingUser, CONFLICT, "Username already in use");
    
    // create user
    const user = await UserModel.create({
        username: data.username,
        password: data.password,
    });

    // create session 
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    });

    // sign access toekn & refresh token
    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d",
        }
    );

    const accessToken = jwt.sign(
        { 
            userId: user._id,
            sessionId: session._id, 
        },
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m",
        }
    );

    // return user & tokens
    return{
        user: user.omitPassword(),
        accessToken,
        refreshToken
    }
}