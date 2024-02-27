import { User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../prisma";
import { ForbiddenResponse, NotFoundResponse } from "../web/response";

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
