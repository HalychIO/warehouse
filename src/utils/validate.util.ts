import {NextFunction, Request, Response} from "express";
import {ZodObject} from "zod";

interface ValidationSchemas {
    body?: ZodObject<any>;
    params?: ZodObject<any>;
    query?: ZodObject<any>;
}

export default function validateUtil(schemas: ValidationSchemas) {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (schemas.body) req.body = schemas.body.parse(req.body);
        if (schemas.params) req.params = schemas.params.parse(req.params) as any;
        if (schemas.query) req.query = schemas.query.parse(req.query) as any;

        next();
    };
}