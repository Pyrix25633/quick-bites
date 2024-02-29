import { cookieName } from "@/i18n/settings";
import { getNewToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
    BadRequestResponse,
    NotFoundResponse,
    UnauthorizedResponse
} from "@/lib/web/response";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export type GetRequestBody = {
    username: string;
    password: string;
};

export async function POST(request: Request) {
    const req = (await request.json()) as GetRequestBody;

    const isValidRequest =
        req.username != null &&
        req.password != null &&
        typeof req.username == "string" &&
        typeof req.password == "string";

    if (!isValidRequest) {
        return new BadRequestResponse();
    }

    const user = await prisma.user.findUnique({
        select: {
            id: true,
            passwordHash: true,
            language: true
        },
        where: {
            username: req.username
        }
    });

    if (!user) {
        return new NotFoundResponse();
    }

    const passwordIsRight = await bcrypt.compare(
        req.password,
        user.passwordHash
    );

    if (passwordIsRight) {
        const res = NextResponse.json({});
        res.cookies.set("auth_token", getNewToken(user.id));
        res.cookies.set(cookieName, user.language.toLowerCase());

        return res;
    }

    return new UnauthorizedResponse();
}
