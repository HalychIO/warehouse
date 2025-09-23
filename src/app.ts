import express from 'express';
import departmentRoutes from "./modules/department/department.routes";
import {errorHandlerUtil} from "./utils/errorHandler.util";
import {apiResponseMiddleware} from "./middlewares/apiResponse.middleware";
import morgan from "morgan";

const app = express();

// --- Global middlewares ---
app.use(express.json());
app.use(morgan("dev"));

// --- Custom response middleware (додає res.api) ---
app.use(apiResponseMiddleware);

// --- Routes ---
app.use("/departments", departmentRoutes);

// --- Error handler (останній) ---
app.use(errorHandlerUtil);

export default app;