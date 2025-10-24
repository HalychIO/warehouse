import {Router} from "express";
import controller from "./auth.controller";
import {authRefresh} from "../../middlewares/authRefresh.middleware";
import {authAccess} from "../../middlewares/authAccess.middleware";

const authRouter = Router();

authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.post("/refresh", authRefresh, controller.refreshToken);
authRouter.post("/logout", authRefresh, controller.logout);
authRouter.get("/user", authAccess, controller.user);

export default authRouter;
