import {prisma} from "../../config/prisma";
import {department} from "@prisma/client";


export default class DepartmentServices {
    async create(data: Omit<department, "id">) {
        return prisma.department.create({data});
    }

    async getById(id: number) {
        return prisma.department.findUnique({
            where: {id},
            include: {employee: true},
        });
    }

    async getAll() {
        return prisma.department.findMany({
            include: {employee: true},
        });
    }

    async update(id: number, data: Partial<Omit<department, "id">>) {
        return prisma.department.update({
            where: {id},
            data,
        });
    }

    async delete(id: number) {
        return prisma.department.delete({where: {id}});
    }
}
