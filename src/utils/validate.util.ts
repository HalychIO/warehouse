import {z} from "zod/index";

export default function validateUtil(schema: z.ZodSchema<any>) {
    return (req: any, res: any, next: any) => {
        try {
            schema.parse(req.body);
            next();
        } catch (e: any) {
            res.status(400).json({message: e.errors});
        }
    };
}