import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "../utils/date";

export const REFRESH_PATH = "/auth/refresh";
// to allow for running in development mode which uses http (not secure)
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true, // cookies not accessible from JS
    secure, 
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow()
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH // which path for this to be sent on
});

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
}

export const setAuthCookies = ({res, accessToken, refreshToken}:Params ) =>
    res
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response): Response => {
    res
        .clearCookie("accessToken")
        .clearCookie("refreshToken", { path: REFRESH_PATH });
    return res;
};