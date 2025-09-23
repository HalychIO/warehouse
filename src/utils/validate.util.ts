import {z} from "zod/index";
import {AppErrorUtil} from "./AppError.util";
import {NextFunction, Request, Response} from "express";

export default function validateUtil(schema: z.ZodSchema<any>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (e: any) {
            throw new AppErrorUtil(400, e.errors[0].message);
        }
    };
}