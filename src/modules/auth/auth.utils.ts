import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export function generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "15m"});
}

export function generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: "7d"});
}
