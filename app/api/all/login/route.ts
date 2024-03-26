import { localeCookieName } from "@/i18n";
import { authCookieName, getNewToken } from "@/lib/auth";
import { findUserFromUsername } from "@/lib/database/user";
import { getNonEmptyString, getObject } from "@/lib/utils/type-validation";
import {
    InternalServerErrorResponse,
    OkNextResponse,
    UnauthorizedResponse
} from "@/lib/web/response";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export type RequestLogin = {
    username: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const json = getObject(await request.json());
        const username = getNonEmptyString(json.username);
        const password = getNonEmptyString(json.password);
        const user = await findUserFromUsername(username);
        if (!bcrypt.compare(password, user.passwordHash))
            throw new UnauthorizedResponse();
        const response = OkNextResponse.json({ role: user.role });
        response.cookies.set(authCookieName, getNewToken(user.id), {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });
        response.cookies.set(localeCookieName, user.language.toLowerCase());
        return response;
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
