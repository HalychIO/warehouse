import {z} from "zod";

export const createPositionSchema = z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(1),
    level_id: z.number(),
});

export const updatePositionSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    description: z.string().min(1).optional(),
    level_id: z.number().optional(),
});