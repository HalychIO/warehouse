import {access_level, Prisma, PrismaClient} from "@prisma/client";
import {prisma} from "../../config/prisma";

export class AccessLevelService {
    private table: PrismaClient["access_level"] = prisma.access_level;

    async getAll() {
        return this.table.findMany({
            include: {position: true},
        });
    }

    async getById(id: number) {
        return this.table.findUnique({
            where: {id},
            include: {position: true},
        });
    }

    async create(data: Prisma.access_levelCreateInput) {
        return this.table.create({data});
    }

    async update(id: number, data: Partial<Omit<access_level, "id">>) {
        return this.table.update({
            where: {id},
            data,
        });
    }

    async delete(id: number) {
        return this.table.delete({where: {id}});
    }
}