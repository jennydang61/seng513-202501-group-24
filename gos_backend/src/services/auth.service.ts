import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import appAssert from "../utils/appAssert";
import { signToken, refreshTokenSignOptions } from "../utils/jwt";

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
    const userId = user._id;
    
    // create session 
    const session = await SessionModel.create({
        userId,
        userAgent: data.userAgent,
    });
    
    // sign access toekn & refresh token
    const refreshToken = signToken(
        { sessionId: session._id },
        refreshTokenSignOptions
    )
    
    const accessToken = signToken(
        { 
            userId,
            sessionId: session._id, 
        }
    );

    // return user & tokens
    return{
        user: user.omitPassword(),
        accessToken,
        refreshToken
    }
}

export type LoginParams = {
    username: string;
    password: string;
    userAgent?: string;
}

export const loginUser = async ({username, password, userAgent}: LoginParams) => {
    // login logic
    // get the user by username
    const user = await UserModel.findOne({ username });
    appAssert(user, UNAUTHORIZED, "Invalid username or password");

    // validatgte password from the request
    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid username or password");

    const userId = user._id;

    // create a session
    const session = await SessionModel.create({
        userId,
        userAgent,
    })

    const sessionInfo = {
        sessionId: session._id,
    }
    
    // sign access toekn & refresh token
    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

    const accessToken = signToken({ 
        ...sessionInfo,
        userId,
    });

    // return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    };
};