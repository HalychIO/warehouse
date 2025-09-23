import {RequestHandler} from "express";
import {ApiResponse} from "../interfaces/api-response.interface";

export const apiResponseMiddleware: RequestHandler = (_req, res, next) => {
    res.api = {
        success: <T>(statusCode = 200, message = "OK", data: T) => {
            const response: ApiResponse<T> = {
                success: true,
                message,
                data,
            };
            return res.status(statusCode).json(response);
        },
        error: (statusCode: number, message: string, details?: unknown) => {
            const response: ApiResponse = {
                success: false,
                error: {statusCode, message, details},
            };
            return res.status(statusCode).json(response);
        },
    };
    next();
}