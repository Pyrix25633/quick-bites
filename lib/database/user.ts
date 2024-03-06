import { Language, Role, School, TempUser, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import {
    ForbiddenResponse,
    InternalServerErrorResponse,
    NotFoundResponse,
    UnprocessableContentResponse
} from "../web/response";

export async function createUser(
    username: string,
    email: string,
    password: string,
    language: Language,
    role: Role,
    school: School | null
): Promise<User> {
    const user: User | null = await prisma.user.create({
        data: {
            username: username,
            email: email,
            passwordHash: await bcrypt.hash(password, 12),
            language: language,
            role: role,
            schoolId: school == null ? null : school.id
        }
    });
    if (user == null) throw new UnprocessableContentResponse();
    return user;
}

export async function createUserFromTempUser(
    tempUser: TempUser
): Promise<User> {
    const usernameMatch = tempUser.email.match(/^(.+)@/);
    if (usernameMatch == null) throw new InternalServerErrorResponse();
    const username = usernameMatch[1];
    const user: User | null = await prisma.user.create({
        data: {
            username: username,
            email: tempUser.email,
            passwordHash: tempUser.passwordHash,
            language: tempUser.language,
            role: Role.BUYER,
            schoolId: tempUser.schoolId
        }
    });
    if (user == null) throw new UnprocessableContentResponse();
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

export async function findUserFromUsername(username: string): Promise<User> {
    const user: User | null = await prisma.user.findUnique({
        where: {
            username: username
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

export async function updateUserPassword(
    id: number,
    password: string
): Promise<User> {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            passwordHash: await bcrypt.hash(password, 12)
        }
    });
}

export async function updateUserLanguage(
    id: number,
    language: Language
): Promise<User> {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            language: language
        }
    });
}
