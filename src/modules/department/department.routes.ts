import {Router} from "express";
import {DepartmentControllers} from "./department.controllers";
import {createDepartmentSchema, updateDepartmentSchema} from "./department.validations";
import validate from "../../utils/validate";

const departmentRoutes = Router();

const controller = new DepartmentControllers();

departmentRoutes.post("/", validate(createDepartmentSchema), controller.create.bind(controller));
departmentRoutes.get("/", controller.getAll.bind(controller));
departmentRoutes.get("/:id", controller.getById.bind(controller));
departmentRoutes.put("/:id", validate(updateDepartmentSchema), controller.update.bind(controller));
departmentRoutes.delete("/:id", controller.delete.bind(controller));

export default departmentRoutes;