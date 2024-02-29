import { getUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ForbiddenResponse } from "@/lib/web/response";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roles = ["buyer", "seller", "admin"];
const publicRoutes = ["/login", "/api/auth/login"];

export async function withAuth(request: NextRequest): Promise<void> {
    const path = request.nextUrl.pathname;

    if (publicRoutes.includes(path)) return;

    function relativeRedirect(path: string) {
        const url = request.nextUrl.clone();
        url.pathname = path;
        throw NextResponse.rewrite(url);
    }

    const userId = getUserId();

    if (userId === null) {
        return relativeRedirect("/login");
    }

    const user = await prisma.user.findUnique({
        select: {
            role: true
        },
        where: {
            id: userId
        }
    });

    if (user === null) {
        return relativeRedirect("/login");
    }

    const pathSections = path.split("/");

    for (let i = 1; i <= 3; ++i) {
        if (roles.includes(pathSections.at(i) ?? "")) {
            const role = pathSections.at(i);
            if (role === user.role) return;
        }
    }

    throw new ForbiddenResponse();
}

export default withAuth;
