import express from 'express';

import {errorHandlerUtil} from "./utils/errorHandler.util";
import {apiResponseMiddleware} from "./middlewares/apiResponse.middleware";

import departmentRoutes from "./modules/department/department.routes";
import positionRoutes from "./modules/position/position.routes";
import accessLevelRoutes from "./modules/accessLevel/accessLevel.routes";
import {requestLogger} from "./middlewares/logger.middleware";

const app = express();

// --- Global middlewares ---
app.use(express.json());
// app.use(morgan("dev"));
app.use(requestLogger);

// --- Custom response middleware (додає res.api) ---
app.use(apiResponseMiddleware);

// --- Routes ---
app.use("/departments", departmentRoutes);
app.use("/positions", positionRoutes);
app.use("/access-level", accessLevelRoutes);

// --- Error handler (останній) ---
app.use(errorHandlerUtil);

export default app;