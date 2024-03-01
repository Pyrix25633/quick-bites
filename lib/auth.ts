import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { ForbiddenResponse } from "./web/response";

const ALGORITHM = "HS512";

type TokenPayload = {
    userId: number;
};

export function getNewToken(userId: number) {
    const payload: TokenPayload = { userId };

    return jwt.sign(payload, "password", {
        algorithm: ALGORITHM,
        expiresIn: 60 * 60
    });
}

export function getUserId(): number | null {
    const token = cookies().get("auth_token");

    if (!token) return null;

    let payload;

    try {
        payload = jwt.verify(token.value, "password") as TokenPayload;
    } catch (_) {
        return null;
    }

    return payload.userId;
}

type Role = "BUYER" | "SELLER" | "ADMIN";

export async function protectRoute(permittedRoles: Role[]): Promise<number> {
    const userId = getUserId();

    if (userId == null) throw new ForbiddenResponse();

    const user = await prisma.user.findUnique({
        select: {
            role: true
        },
        where: {
            id: userId
        }
    });

    if (user == null) throw new ForbiddenResponse();

    if (permittedRoles.includes(user.role)) {
        return userId;
    }

    throw new ForbiddenResponse();
}
