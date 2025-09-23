import {Router} from "express";
import {DepartmentControllers} from "./department.controllers";
import {createDepartmentSchema, updateDepartmentSchema} from "./department.validations";
import validateUtil from "../../utils/validate.util";

const departmentRoutes = Router();

const controller = new DepartmentControllers();

departmentRoutes.post("/", validateUtil(createDepartmentSchema), controller.create.bind(controller));
departmentRoutes.get("/", controller.getAll.bind(controller));
departmentRoutes.get("/:id", controller.getById.bind(controller));
departmentRoutes.put("/:id", validateUtil(updateDepartmentSchema), controller.update.bind(controller));
departmentRoutes.delete("/:id", controller.delete.bind(controller));

export default departmentRoutes;