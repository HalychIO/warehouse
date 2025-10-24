import express from 'express';
import cookieParser from "cookie-parser";

import {errorHandlerUtil} from "./utils/errorHandler.util";
import {apiResponseMiddleware} from "./middlewares/apiResponse.middleware";
import {requestLogger} from "./middlewares/logger.middleware";

import departmentRoutes from "./modules/department/department.routes";
import positionRoutes from "./modules/position/position.routes";
import accessLevelRoutes from "./modules/accessLevel/accessLevel.routes";
import authRouter from "./modules/auth/auth.routes";
import {authAccess} from "./middlewares/authAccess.middleware";


const app = express();

// --- Global middlewares ---
app.use(express.json());
// app.use(morgan("dev"));
app.use(requestLogger);
app.use(cookieParser());

// --- Custom response middleware (додає res.api) ---
app.use(apiResponseMiddleware);

// --- Routes ---
app.use("/auth", authRouter);

app.use(authAccess);

app.use("/departments", departmentRoutes);
app.use("/positions", positionRoutes);
app.use("/access-level", accessLevelRoutes);

// --- Error handler (останній) ---
app.use(errorHandlerUtil);

export default app;