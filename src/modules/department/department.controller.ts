import {Request, Response} from "express";
import DepartmentService from "./department.service";


const departmentService = new DepartmentService();

export class DepartmentController {
    async create(req: Request, res: Response) {
        try {
            const department = await departmentService.createDepartment(req.body);
            res.status(201).json(department);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const department = await departmentService.getDepartmentById(id);
            if (!department) {
                return res.status(404).json({message: "Department not found"});
            }
            res.json(department);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const departments = await departmentService.getAllDepartments();
            res.json(departments);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const department = await departmentService.updateDepartment(id, req.body);
            res.json(department);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await departmentService.deleteDepartment(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }
}