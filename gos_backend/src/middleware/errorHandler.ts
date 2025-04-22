import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies";

const handleZodError = (res:Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({ // array of error issues
        path: err.path.join("."), // take the entire path and combine it with periods
        message: err.message, // error message
    }));
    console.log("here: ", errors)
    return res.status(BAD_REQUEST).json({
        errors, 
        message: errors[0].message,
    });
}  

const handleAppError = (res: Response, error: AppError) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode, // optional
    });
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);

    if (req.path === REFRESH_PATH) {
        clearAuthCookies(res);
    }

    if (error instanceof z.ZodError) {
        handleZodError(res, error);
        return;
    }

    if (error instanceof AppError) {
        handleAppError(res, error);
        return;
    }
    
    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
