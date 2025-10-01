import {NextFunction, Request, Response} from "express";
import {logger} from "../config/logger";


export function errorLogger(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(
        `Error: ${err.message} | URL: ${req.originalUrl} | Method: ${req.method}`
    );

    res.status(500).json({error: "Internal Server Error"});
}