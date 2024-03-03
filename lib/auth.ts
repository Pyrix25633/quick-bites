import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {
    ForbiddenResponse,
    NotFoundResponse,
    UnauthorizedResponse
} from "./web/response";
import { findUser } from "./database/user";
import { getUserId as getUserIdOrThrow } from "./utils/semantic-validation";

const algorithm = "HS512";
const password = "bv/2ad1b.yf@atw";
const expiresIn = 60 * 60 * 24 * 14;
export const authCookieName = "auth_token";

type TokenPayload = {
    userId: number;
};

export function getNewToken(userId: number) {
    const payload: TokenPayload = { userId };
    return jwt.sign(payload, password, {
        algorithm: algorithm,
        expiresIn: expiresIn
    });
}

export function getUserId(): number | null {
    const token = cookies().get(authCookieName);
    if (token == undefined) return null;
    try {
        const payload = jwt.verify(token.value, password) as TokenPayload;
        return payload.userId;
    } catch (_) {
        return null;
    }
}

type Role = "BUYER" | "SELLER" | "ADMIN";

export async function protectRoute(permittedRoles: Role[]): Promise<number> {
    const userId = getUserIdOrThrow();
    try {
        const user = await findUser(userId);
        if (permittedRoles.includes(user.role)) {
            return userId;
        }
    } catch (e) {
        if (e instanceof NotFoundResponse) throw new UnauthorizedResponse();
        throw e;
    }
    throw new ForbiddenResponse();
}
