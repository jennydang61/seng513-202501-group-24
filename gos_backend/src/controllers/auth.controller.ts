import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = z.object({
    username: z.string().min(6).max(20),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    userAgent: z.string().optional(),
    })
    .refine(
    (data) => data.password === data.confirmPassword, {
        message: "Passwords do not match", 
        path: ["confirmPassword"],
    });

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