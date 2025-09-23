import {z} from "zod/index";
import {AppErrorUtil} from "./AppError.util";

export default function validateUtil(schema: z.ZodSchema<any>) {
    return (req: any, res: any, next: any) => {
        try {
            schema.parse(req.body);
            next();
        } catch (e: any) {
            throw new AppErrorUtil(e.errors[0].message, 400);
        }
    };
}