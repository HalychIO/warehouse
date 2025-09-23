import {ErrorRequestHandler} from "express";
import {AppErrorUtil} from "./AppError.util";
import {Prisma} from "@prisma/client";

export const errorHandlerUtil: ErrorRequestHandler = (err, _req, res, _next) => {
    // Prisma помилки
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

        return res.status(statusCode).json({
            status: "fail",
            message,
        });
    }

    // Кастомні AppErrorUtil
    if (err instanceof AppErrorUtil) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    // Стандартні JS помилки
    if (err instanceof Error) {
        console.error("Unexpected error:", err); // Лог для сервера

        return res.status(500).json({
            status: "error",
            message: err.message || "Internal server error",
        });
    }

    // Якщо прилетіло щось взагалі неочікуване
    return res.status(500).json({
        status: "error",
        message: "Unknown error",
    });
}
