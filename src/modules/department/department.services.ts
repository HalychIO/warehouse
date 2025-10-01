import {department, Prisma, PrismaClient} from "@prisma/client";
import {prisma} from "../../config/prisma";


export default class DepartmentServices {
    private table: PrismaClient["department"] = prisma.department;

    async getAll() {
        return this.table.findMany({
            include: {employee: true},
        });
    }

    async getById(id: number) {
        return this.table.findUnique({
            where: {id},
            include: {employee: true},
        });
    }

    async create(data: Prisma.departmentCreateInput) {
        return this.table.create({data});
    }

    async update(id: number, data: Partial<Omit<department, "id">>) {
        return this.table.update({
            where: {id},
            data,
        });
    }

    async delete(id: number) {
        return this.table.delete({where: {id}});
    }
}
