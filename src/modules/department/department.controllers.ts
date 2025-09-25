import {Request, Response} from "express";
import DepartmentServices from "./department.services";
import {catchAsyncUtil} from "../../utils/catchAsync.util";
import {AppErrorUtil} from "../../utils/AppError.util";
import throwErrorUtil from "../../utils/throwError.util";
import IThrowErrorUtilParams from "../../interfaces/IThrowErrorUtilParams.interface";

const errors: { [kay: string]: IThrowErrorUtilParams } = {
    INVALID_ID: {code: 400, message: "Invalid department ID"},
    NOT_FOUND: {code: 404, message: "Department not found"},
};

export class DepartmentControllers {
    private controller = new DepartmentServices();

    getAll = catchAsyncUtil(async (_req, res: Response) => {
        const departments = await this.controller.getAll();
        res.api.success(200, "OK", departments);
    })

    getById = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throwErrorUtil(errors.INVALID_ID);

        const department = await this.controller.getById(id);
        if (!department) throwErrorUtil(errors.NOT_FOUND);

        res.api.success(200, "OK", department);
    })

    create = catchAsyncUtil(async (req: Request, res: Response) => {
        const department = await this.controller.create(req.body);
        res.api.success(201, "Created", department);
    })

    update = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid department ID");

        const department = await this.controller.update(id, req.body);
        if (!department) throw new AppErrorUtil(404, "Department not found");

        res.api.success(200, "OK", department);
    })

    delete = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid department ID");

        const department = await this.controller.getById(id);
        if (!department) throwErrorUtil(errors.NOT_FOUND);

        await this.controller.delete(id).then(() => {
            res.api.success(200, "Deleted");
        });
    })
}