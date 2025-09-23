import {prisma} from "../../config/prisma";
import {position} from "@prisma/client";

export default class PositionServices {
    async create(data: Omit<position, "id">): Promise<position | null> {
        return prisma.position.create({data});
    }

    async getById(id: number) {
        return prisma.position.findUnique({
            where: {id},
            include: {access_level: true},
        });
    }

    async getAll() {
        return prisma.position.findMany({
            include: {access_level: true},
        });
    }

    async update(id: number, data: Partial<Omit<position, "id">>) {
        return prisma.position.update({
            where: {id},
            data,
        });
    }

    async delete(id: number) {
        return prisma.position.delete({where: {id}});
    }
}
