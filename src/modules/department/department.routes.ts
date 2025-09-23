import {Router} from "express";
import {DepartmentControllers} from "./department.controllers";
import {createDepartmentSchema, updateDepartmentSchema} from "./department.validations";
import validateUtil from "../../utils/validate.util";

const departmentRoutes = Router();

const controller = new DepartmentControllers();

departmentRoutes.get("/", controller.getAll);
departmentRoutes.get("/:id", controller.getById);
departmentRoutes.post("/", validateUtil(createDepartmentSchema), controller.create);
departmentRoutes.put("/:id", validateUtil(updateDepartmentSchema), controller.update);
departmentRoutes.delete("/:id", controller.delete);

export default departmentRoutes;