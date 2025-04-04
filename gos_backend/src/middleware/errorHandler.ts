import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";

const handleZodError = (res:Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({ // array of error issues
        path: err.path.join("."), // take the entire path and combine it with periods
        message: err.message, // error message
    }));
    return res.status(BAD_REQUEST).json({
        message: error.message,
        errors, 
    });
}  

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);
    // if (req.path === REFRESH_PATH) {
    //     clearAuthCookies(res);
    // }

    if (error instanceof z.ZodError) {
        handleZodError(res, error);
        return;
    }

    // if (error instanceof AppError) {
    //     return handleAppError(res, error);
    // }
    
    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
