import {Request, Response} from "express";
import PositionServices from "./position.services";
import {catchAsyncUtil} from "../../utils/catchAsync.util";
import {AppErrorUtil} from "../../utils/AppError.util";


const positionServices = new PositionServices();

export class PositionControllers {
    getAll = catchAsyncUtil(async (_req: Request, res: Response) => {
        const positions = await positionServices.getAll();
        res.api.success(200, "OK", positions);
    })

    getById = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid position ID");

        const position = await positionServices.getById(id);
        if (!position) throw new AppErrorUtil(404, "Position not found");

        res.api.success(200, "OK", position);
    })

    create = catchAsyncUtil(async (req: Request, res: Response) => {
        const position = await positionServices.create(req.body);
        res.api.success(201, "Created", position);
    })

    update = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid position ID");

        const position = await positionServices.update(id, req.body);
        if (!position) throw new AppErrorUtil(404, "Position not found");

        res.api.success(200, "OK", position);
    })

    delete = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid position ID");

        await positionServices.delete(id);

        res.api.success(204, "Deleted");
    })
}