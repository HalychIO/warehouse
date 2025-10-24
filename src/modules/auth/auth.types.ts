import type {employee, user_account} from "@prisma/client";
import {RequireAtLeastOne} from "../../interfaces/objTypes";

export type UserWere = RequireAtLeastOne<{
    id?: number,
    employee_id?: number,
    username?: string,
}>;

export type ITokens = {
    accessToken: string;
    refreshToken?: string;
}

export interface IAuthService {
    getTokens(id: number, employee_id: number): Promise<ITokens>

    getUser(where: UserWere): Promise<(user_account & { employee: any }) | null>;

    getEmployee(id: number): Promise<(employee) | null>

    register(
        username: string,
        password: string,
        email: string
    ): Promise<ITokens>;

    login(
        username: string,
        password: string
    ): Promise<ITokens>;

    refresh(refreshToken: string): Promise<ITokens>;

    logout(refreshToken: string): Promise<void>;
}
