import { School } from "@prisma/client";
import prisma from "../prisma";
import { NotFoundResponse } from "../web/response";

export async function findSchool(id: number): Promise<School> {
    const school = await prisma.school.findUnique({
        where: {
            id: id
        }
    });
    if (school == null) throw new NotFoundResponse();
    return school;
}

export async function findSchools(): Promise<School[]> {
    return await prisma.school.findMany();
}
