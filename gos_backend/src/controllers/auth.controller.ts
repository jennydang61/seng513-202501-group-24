import { CREATED, OK } from "../constants/http";
import SessionModel from "../models/session.model";
import { createAccount, loginUser } from "../services/auth.service";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import catchErrors from "../utils/catchErrors";
import { loginSchema, registerSchema } from "./auth.schemas";

export const registerHandler = catchErrors(async(req, res) => {
        // validate request
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],  // device being used for registration
        })

        // call service
        const { user, accessToken, refreshToken } = await createAccount(request);

        // return response with cookies (refresh token)
        return setAuthCookies({res, accessToken, refreshToken})
        .status(CREATED)
        .json(user);
    }
);

export const loginHandler = catchErrors(async(req, res) => {
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    }); // validate request
    const {
        accessToken, refreshToken,
    } = await loginUser(request); // call service

    return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
        message: "Login successful",
    });
})

export const logoutHandler = catchErrors(async(req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken);
    
    if (payload) {
        // remove session from db
        await SessionModel.findByIdAndDelete(payload.sessionId);
    }
    // undefined payload ignored for now

    // clear cookies
    return clearAuthCookies(res)
        .status(OK)
        .json({ message: "Logout successful"})

})