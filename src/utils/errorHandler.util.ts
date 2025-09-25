import {ErrorRequestHandler} from "express";
import {AppErrorUtil} from "./AppError.util";
import {Prisma} from "@prisma/client";
import {ZodError} from "zod";

export const errorHandlerUtil: ErrorRequestHandler = (err, _req, res, _next) => {
    // Zod errors
    if (err instanceof ZodError) {
        const details = err.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message,
        }));

        return res.api.error(400, "Validation failed", details);
    }

    // Prisma error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        let message = "Database error";
        let statusCode = 400;

        switch (err.code) {
            case "P2002": // Unique constraint failed
                message = `Unique constraint failed on ${err.meta?.target}`;
                statusCode = 409;
                break;
            case "P2025": // Record not found
                message = "Record not found";
                statusCode = 404;
                break;
            default:
                message = `Prisma error: ${err.code}`;
                statusCode = 500;
        }

        return res.api.error(statusCode, message)
    }

    // AppErrorUtil
    if (err instanceof AppErrorUtil) {
        return res.api.error(err.statusCode, err.message);
    }

    // JS error
    if (err instanceof Error) {
        console.error("Unexpected error:", err); // Лог для сервера

        return res.api.error(500, err.message || "Internal server error")
    }

    // default
    return res.api.error(500, err.message || "Unknown error")
}
