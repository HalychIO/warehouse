import {z} from "zod";

export const createAccessLevelSchema = z.object({
    level: z.string().min(1).max(50),
    description: z.string().min(1),
});

export const updateAccessLevelSchema = z.object({
    level: z.string().min(1).max(50).optional(),
    description: z.string().min(1).optional(),
});