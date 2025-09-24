import {prisma} from "../../config/prisma";
import {position, PrismaClient} from "@prisma/client";

export default class PositionServices {
    private table: PrismaClient["position"] = prisma.position;

    async getAll() {
        return this.table.findMany({
            include: {access_level: true},
        });
    }
    
    async getById(id: number) {
        return this.table.findUnique({
            where: {id},
            include: {access_level: true},
        });
    }

    async create(data: Omit<position, "id">): Promise<position | null> {
        return this.table.create({data});
    }

    async update(id: number, data: Partial<Omit<position, "id">>) {
        return this.table.update({
            where: {id},
            data,
        });
    }

    async delete(id: number) {
        return this.table.delete({where: {id}});
    }
}
