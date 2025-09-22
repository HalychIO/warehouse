import {prisma} from "../../config/prisma";
import {department} from "@prisma/client";


export default class DepartmentService {
    async createDepartment(data: Omit<department, "id">) {
        return prisma.department.create({data});
    }

    async getDepartmentById(id: number) {
        return prisma.department.findUnique({
            where: {id},
            include: {employee: true},
        });
    }

    async getAllDepartments() {
        return prisma.department.findMany({
            include: {employee: true},
        });
    }

    async updateDepartment(id: number, data: Partial<Omit<department, "id">>) {
        return prisma.department.update({
            where: {id},
            data,
        });
    }

    async deleteDepartment(id: number) {
        return prisma.department.delete({where: {id}});
    }
}
