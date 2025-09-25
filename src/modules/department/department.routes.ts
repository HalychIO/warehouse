import {Router} from "express";
import {DepartmentControllers} from "./department.controllers";
import {createDepartmentSchema, idSchema, updateDepartmentSchema} from "./department.validations";
import validateUtil from "../../utils/validate.util";

const departmentRoutes = Router();

const controller = new DepartmentControllers();

departmentRoutes.get("/", controller.getAll);
departmentRoutes.get("/:id", validateUtil({params: idSchema}), controller.getById);
departmentRoutes.post("/", validateUtil({body: createDepartmentSchema}), controller.create);
departmentRoutes.put("/:id", validateUtil({params: idSchema, body: updateDepartmentSchema}), controller.update);
departmentRoutes.delete("/:id", validateUtil({params: idSchema}), controller.delete);

export default departmentRoutes;