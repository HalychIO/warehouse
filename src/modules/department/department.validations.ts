import {z} from "zod";

export const idSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
});

export const createDepartmentSchema = z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(1),
});

export const updateDepartmentSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    description: z.string().min(1).optional(),
});