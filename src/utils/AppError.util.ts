export class AppErrorUtil extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // зберігаємо назву класу для коректного stack trace
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}