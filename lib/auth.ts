import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
