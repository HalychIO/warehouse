import {Request, Response} from "express";
import DepartmentServices from "./department.services";
import {catchAsyncUtil} from "../../utils/catchAsync.util";
import {AppErrorUtil} from "../../utils/AppError.util";


const departmentService = new DepartmentServices();

export class DepartmentControllers {
    getById = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid department ID");

        const department = await departmentService.getById(id);

        if (!department) throw new AppErrorUtil(404, "Department not found");

        res.api.success(200, "OK", department);
    })

    create = catchAsyncUtil(async (req: Request, res: Response) => {
        const department = await departmentService.create(req.body);
        res.api.success(201, "Created", department);
    })

    getAll = catchAsyncUtil(async (_req, res: Response) => {
        const departments = await departmentService.getAll();
        res.api.success(200, "OK", departments);
    })

    update = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new AppErrorUtil(400, "Invalid department ID");

        const department = await departmentService.update(id, req.body);
        if (!department) throw new AppErrorUtil(404, "Department not found");

        res.api.success(200, "OK", department);
    })

    delete = catchAsyncUtil(async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        await departmentService.delete(id);
        res.api.success(204, "Deleted");
    })
}