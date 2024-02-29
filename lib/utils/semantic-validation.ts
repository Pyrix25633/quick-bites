import { Role } from "@prisma/client";
import { getIntOrNull, getNonEmptyString } from "./type-validation";
import { BadRequestResponse, UnauthorizedResponse } from "../web/response";

export function getUserId(): number {
    const userId = getUserId();
    if (userId == null) throw new UnauthorizedResponse();
    return userId;
}

export function getEmail(raw: any): string {
    const parsed = getNonEmptyString(raw);
    if (
        parsed.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
        return parsed;
    throw new BadRequestResponse();
}

export function getRole(raw: any): Role {
    const parsed = getNonEmptyString(raw);
    let role;
    role = Object.values(Role).forEach((value) => {
        if (value == parsed) return value;
    });
    if (role == undefined) throw new BadRequestResponse();
    return role;
}

export function getSchoolId(raw: any, role: Role): number | null {
    const parsed = getIntOrNull(raw);
    if (role == Role.BUYER && parsed == null) throw new BadRequestResponse();
    return parsed;
}
