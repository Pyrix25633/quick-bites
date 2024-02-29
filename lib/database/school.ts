import { School } from "@prisma/client";
import prisma from "../prisma";

export async function findSchool(id: number): Promise<School | null> {
    return await prisma.school.findUnique({
        where: {
            id: id
        }
    });
}
