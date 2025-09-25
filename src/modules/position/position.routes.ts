import {Router} from "express";
import validateUtil from "../../utils/validate.util";
import {PositionControllers} from "./position.controllers";
import {createPositionSchema, updatePositionSchema} from "./position.validations";

const positionRoutes = Router();

const controller = new PositionControllers();

positionRoutes.get("/", controller.getAll);
positionRoutes.get("/:id", controller.getById);
positionRoutes.post("/", validateUtil({body: createPositionSchema}), controller.create);
positionRoutes.put("/:id", validateUtil({body: updatePositionSchema}), controller.update);
positionRoutes.delete("/:id", controller.delete);

export default positionRoutes;