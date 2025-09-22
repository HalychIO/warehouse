import express, {NextFunction, Request, Response} from 'express';
import departmentRoutes from "./modules/department/department.routes";

const app = express();

// --- middleware ---
app.use(express.json());

// --- routes ---
app.use("/departments", departmentRoutes);

// --- error handling ---
app.use((
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;