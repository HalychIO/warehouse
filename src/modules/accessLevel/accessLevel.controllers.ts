import {Request, Response} from "express";
import {AccessLevelService} from "./accessLevel.services";
import {catchAsyncUtil} from "../../utils/catchAsync.util";
import IThrowErrorUtilParams from "../../interfaces/IThrowErrorUtilParams.interface";
import throwErrorUtil from "../../utils/throwError.util";


const errors: { [kay: string]: IThrowErrorUtilParams } = {
    INVALID_ID: {code: 400, message: "Invalid department ID"},
    NOT_FOUND: {code: 404, message: "Department not found"},
};

export class AccessLevelControllers {
    private controller = new AccessLevelService();

    getAll = catchAsyncUtil(async (_req: Request, res: Response) => {
        const accessLevels = await this.controller.getAll();
        res.api.success(200, "OK", accessLevels);
    })

    getById = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        const accessLevels = await this.controller.getById(id);
        if (!accessLevels) throwErrorUtil(errors.NOT_FOUND);

        res.api.success(200, "OK", accessLevels);
    })

    create = catchAsyncUtil(async (req: Request, res: Response) => {
        const accessLevels = await this.controller.create(req.body);
        res.api.success(201, "Created", accessLevels);
    })

    update = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        const accessLevels = await this.controller.update(id, req.body);
        if (!accessLevels) throwErrorUtil(errors.NOT_FOUND);

        res.api.success(200, "OK", accessLevels);
    })

    delete = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        await this.controller.delete(id);

        res.api.success(204, "Deleted");
    })
}
