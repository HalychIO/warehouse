import {AccessLevelControllers} from "./accessLevel.controllers";
import validateUtil from "../../utils/validate.util";
import {Router} from "express";
import {createAccessLevelSchema, updateAccessLevelSchema} from "./accessLevel.validations";

const accessLevelRoutes = Router();

const controller = new AccessLevelControllers();

accessLevelRoutes.get("/", controller.getAll);
accessLevelRoutes.get("/:id", controller.getById);
accessLevelRoutes.post("/", validateUtil({body: createAccessLevelSchema}), controller.create);
accessLevelRoutes.put("/:id", validateUtil({body: updateAccessLevelSchema}), controller.update);
accessLevelRoutes.delete("/:id", controller.delete);

export default accessLevelRoutes;