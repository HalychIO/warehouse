import {z} from "zod";

export const createAccessLevelSchema = z.object({
    level: z.string().min(1).max(200),
    description: z.string().min(1),
});

export const updateAccessLevelSchema = z.object({
    level: z.string().min(1).max(200).optional(),
    description: z.string().min(1).optional(),
});