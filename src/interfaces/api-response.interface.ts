export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        statusCode: number;
        message: string;
        details?: unknown;
    };
}