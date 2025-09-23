import express from 'express';
import morgan from "morgan";

import {errorHandlerUtil} from "./utils/errorHandler.util";
import {apiResponseMiddleware} from "./middlewares/apiResponse.middleware";

import departmentRoutes from "./modules/department/department.routes";
import positionRoutes from "./modules/position/position.routes";

const app = express();

// --- Global middlewares ---
app.use(express.json());
app.use(morgan("dev"));

// --- Custom response middleware (додає res.api) ---
app.use(apiResponseMiddleware);

// --- Routes ---
app.use("/departments", departmentRoutes);
app.use("/positions", positionRoutes);

// --- Error handler (останній) ---
app.use(errorHandlerUtil);

export default app;