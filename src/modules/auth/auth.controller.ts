import {Request, Response} from "express";
import AuthService from "./auth.service";
import {catchAsyncUtil} from "../../utils/catchAsync.util";
import {IAuthService} from "./auth.types";

class AuthController {
    #service: IAuthService;

    user = catchAsyncUtil(async (req: Request, res: Response) => {
        if (!req.user) throw new Error("Unauthorized");

        const userAccount = await this.#service.getEmployee(req.user?.employee_id);

        res.api.success(200, "OK", userAccount);
    })
    register = catchAsyncUtil(async (req: Request, res: Response) => {
        const {username, password, email} = req.body;

        const tokens = await this.#service.register(username, password, email);

        res.cookie("refreshToken", tokens.refreshToken);
        res.api.success(200, "OK", tokens.accessToken);
    })
    login = catchAsyncUtil(async (req: Request, res: Response) => {
        const {username, password} = req.body;

        const tokens = await this.#service.login(username, password);

        res.cookie("refreshToken", tokens.refreshToken);
        res.api.success(200, "OK", tokens.accessToken);
    })
    refreshToken = catchAsyncUtil(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        const tokens = await this.#service.refresh(refreshToken);

        res.api.success(200, "OK", tokens.accessToken);
    })
    logout = catchAsyncUtil(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        await this.#service.logout(refreshToken);

        res.clearCookie("refreshToken");
        res.api.success(200, "OK");
    })

    constructor(service: IAuthService) {
        this.#service = service;
    }
}

export default new AuthController(AuthService);

