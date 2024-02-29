import { Role, School, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { ForbiddenResponse, NotFoundResponse } from "../web/response";

export async function createUser(
    username: string,
    email: string,
    password: string,
    role: Role,
    school: School | null
): Promise<User> {
    const user: User | null = await prisma.user.create({
        data: {
            username: username,
            email: email,
            passwordHash: await bcrypt.hash(password, 12),
            role: role,
            schoolId: school == null ? null : school.id
        }
    });
    if (user == null) throw new NotFoundResponse();
    return user;
}

export async function findUser(id: number): Promise<User> {
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if (user == null) throw new NotFoundResponse();
    return user;
}

export async function subtractFromUserCredit(
    id: number,
    total: Decimal
): Promise<User> {
    const user = await findUser(id);
    const credit = user.credit.sub(total);
    if (credit.lessThan(0)) throw new ForbiddenResponse();
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            credit: credit
        }
    });
}
