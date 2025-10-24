import jwt from "jsonwebtoken";
import {catchAsyncUtil} from "../utils/catchAsync.util";
import throwErrorUtil from "../utils/throwError.util";

export const authAccess = catchAsyncUtil(async (
    req,
    res,
    next
) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) return throwErrorUtil({code: 401, message: "No token provided"});

    req.user = jwt.verify(token, process.env.JWT_SECRET!) as any;
    next();
})
