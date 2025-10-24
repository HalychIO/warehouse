import jwt from "jsonwebtoken";

import {prisma} from "../../config/prisma";
import {PrismaClient} from "@prisma/client";

import {comparePassword, generateAccessToken, generateRefreshToken, hashPassword} from "./auth.utils";
import throwErrorUtil from "../../utils/throwError.util";

import {IAuthService, UserWere} from "./auth.types";

class AuthService implements IAuthService {
    #tableRefreshToken: PrismaClient["refresh_token"];
    #tableUserAccount: PrismaClient["user_account"];
    #tableEmployee: PrismaClient["employee"];

    constructor(
        tableRefreshTokens: PrismaClient["refresh_token"],
        tableUserAccounts: PrismaClient["user_account"],
        tableEmployee: PrismaClient["employee"],
    ) {
        this.#tableRefreshToken = tableRefreshTokens;
        this.#tableUserAccount = tableUserAccounts;
        this.#tableEmployee = tableEmployee;
    }

    async getTokens(id: number, employee_id: number) {
        const accessToken = generateAccessToken({id, employee_id});
        const refreshToken = generateRefreshToken({id, employee_id});

        await this.#tableRefreshToken.create({data: {token: refreshToken, userId: id}});

        return {accessToken, refreshToken};
    }

    async getUser(where: UserWere) {
        return this.#tableUserAccount.findUnique({
            where,
            include: {employee: true},
        });
    }

    async getEmployee(id: number) {
        return this.#tableEmployee.findUnique({
            where: {
                id
            }
        });
    }

    async register(username: string, password: string, email: string) {
        const employee = await this.#tableEmployee.findUnique({where: {email}});
        if (!employee) throwErrorUtil({code: 400, message: "Employee not found"});

        const existing = await this.#tableUserAccount.findUnique({where: {username}});
        if (existing) throwErrorUtil({code: 400, message: "Username already exists"});

        const user = await this.#tableUserAccount.create({
            data: {
                username,
                password_hash: await hashPassword(password),
                employee_id: employee.id,
                is_active: true,
                last_login: new Date(),
            },
        });

        return await this.getTokens(user.id, user.employee_id);
    }

    async login(username: string, password: string) {
        const user = await this.getUser({username});
        if (!user) throwErrorUtil({code: 400, message: "Invalid credentials"});

        const valid = await comparePassword(password, user.password_hash);
        if (!valid) throwErrorUtil({code: 400, message: "Invalid credentials"});

        return await this.getTokens(user.id, user.employee_id);
    }

    async refresh(refreshToken: string) {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;

        const stored = await this.#tableRefreshToken.findUnique({where: {token: refreshToken}});
        if (!stored) throw new Error("Invalid refresh token");

        const accessToken = generateAccessToken({id: decoded.id, employee_id: decoded.employee_id});
        return {accessToken};
    }

    async logout(refreshToken: string) {
        await this.#tableRefreshToken.delete({where: {token: refreshToken}});
    }
}

export default new AuthService(prisma.refresh_token, prisma.user_account, prisma.employee);
