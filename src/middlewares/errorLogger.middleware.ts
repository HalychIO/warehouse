import {NextFunction, Request, Response} from "express";
import {logger} from "../config/logger";


export function errorLogger(err: any, req: Request, res: Response, _next: NextFunction) {
    logger.error(
        `Error: ${err.message} | URL: ${req.originalUrl} | Method: ${req.method}`
    );

    res.api.error(500, "Internal Server Error");
}