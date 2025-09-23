import {NextFunction, Request, Response} from "express";

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

export const catchAsyncUtil =
    (fn: AsyncController) =>
        (req: Request, res: Response, next: NextFunction) => {
            fn(req, res, next).catch(next);
        };