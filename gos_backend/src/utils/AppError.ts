import AppErrorCode from "../constants/appErrorCode";
import { HttpStatusCode } from "../constants/http";


export default class AppError extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: AppErrorCode, // optional
    ) {
        super(message);
    }
}
