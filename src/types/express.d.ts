import "express";
import {ApiResponse} from "../interfaces/api-response.interface";

declare module "express-serve-static-core" {
    interface Response {
        api: {
            success: <T>(
                statusCode?: number,
                message?: string,
                data?: T
            ) => Response<ApiResponse<T>>;
            error: (
                statusCode: number,
                message: string,
                details?: unknown
            ) => Response<ApiResponse>;
        };
    }
}
