import { Language, School, TempUser } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import {
    NotFoundResponse,
    UnprocessableContentResponse
} from "../web/response";

export async function createTempUser(
    email: string,
    password: string,
    language: Language,
    school: School | null,
    confirmationCode: number
): Promise<TempUser> {
    const user: TempUser | null = await prisma.tempUser.create({
        data: {
            email: email,
            passwordHash: await bcrypt.hash(password, 12),
            language: language,
            schoolId: school == null ? null : school.id,
            confirmationCode: confirmationCode
        }
    });
    if (user == null) throw new UnprocessableContentResponse();
    return user;
}

export async function findTempUser(email: string): Promise<TempUser> {
    const tempUser = await prisma.tempUser.findUnique({
        where: {
            email: email
        }
    });
    if (tempUser == null) throw new NotFoundResponse();
    return tempUser;
}

export async function deleteTempUser(email: string): Promise<TempUser> {
    const tempUser = await prisma.tempUser.delete({
        where: {
            email: email
        }
    });
    if (tempUser == null) throw new NotFoundResponse();
    return tempUser;
}
