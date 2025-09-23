import express from 'express';
import departmentRoutes from "./modules/department/department.routes";
import {errorHandlerUtil} from "./utils/errorHandler.util";
import {apiResponseMiddleware} from "./middlewares/apiResponse.middleware";

const app = express();

app.use(express.json());

app.use("/departments", departmentRoutes);

app.use(apiResponseMiddleware);

app.use(errorHandlerUtil);

export default app;