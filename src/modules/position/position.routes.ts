import {Router} from "express";
import validateUtil from "../../utils/validate.util";
import {PositionControllers} from "./positionControllers";
import {createPositionSchema, updatePositionSchema} from "./position.validations";

const positionRoutes = Router();

const controller = new PositionControllers();

positionRoutes.get("/", controller.getAll);
positionRoutes.get("/:id", controller.getById);
positionRoutes.post("/", validateUtil(createPositionSchema), controller.create);
positionRoutes.put("/:id", validateUtil(updatePositionSchema), controller.update);
positionRoutes.delete("/:id", controller.delete);

export default positionRoutes;