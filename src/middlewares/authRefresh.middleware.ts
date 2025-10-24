import jwt from "jsonwebtoken";
import {catchAsyncUtil} from "../utils/catchAsync.util";
import throwErrorUtil from "../utils/throwError.util";

export const authRefresh = catchAsyncUtil(async (
    req,
    _res,
    next
) => {
    const token = req.cookies?.refreshToken;

    if (!token) return throwErrorUtil({code: 401, message: "No token provided"});

    req.user = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
    next();
})
