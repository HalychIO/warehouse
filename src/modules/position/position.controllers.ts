import {Request, Response} from "express";
import PositionServices from "./position.services";
import {catchAsyncUtil} from "../../utils/catchAsync.util";
import IThrowErrorUtilParams from "../../interfaces/IThrowErrorUtilParams.interface";
import throwErrorUtil from "../../utils/throwError.util";


const errors: { [kay: string]: IThrowErrorUtilParams } = {
    INVALID_ID: {code: 400, message: "Invalid position ID"},
    NOT_FOUND: {code: 404, message: "Position not found"},
};

export class PositionControllers {
    private controller = new PositionServices();

    getAll = catchAsyncUtil(async (_req: Request, res: Response) => {
        const positions = await this.controller.getAll();
        res.api.success(200, "OK", positions);
    })

    getById = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        const position = await this.controller.getById(id);
        if (!position) throwErrorUtil(errors.NOT_FOUND);

        res.api.success(200, "OK", position);
    })

    create = catchAsyncUtil(async (req: Request, res: Response) => {
        const position = await this.controller.create(req.body);
        res.api.success(201, "Created", position);
    })

    update = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        const position = await this.controller.update(id, req.body);
        if (!position) throwErrorUtil(errors.NOT_FOUND);

        res.api.success(200, "OK", position);
    })

    delete = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        const position = await this.controller.getById(id);
        if (!position) throwErrorUtil(errors.NOT_FOUND);

        await this.controller.delete(id);

        res.api.success(204, "Deleted");
    })
}