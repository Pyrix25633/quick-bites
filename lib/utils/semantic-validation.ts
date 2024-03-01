import { Language, Role } from "@prisma/client";
import { getUserId as getUserIdOrNull } from "../auth";
import {
    getIntOrNull,
    getNonEmptyString,
    getNonEmptyStringOrUndefined
} from "./type-validation";
import { BadRequestResponse, UnauthorizedResponse } from "../web/response";

export function getUserId(): number {
    const userId = getUserIdOrNull();
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

export function getLanguageOrUndefined(raw: any): Language | undefined {
    const parsed = getNonEmptyStringOrUndefined(raw);
    if (parsed === undefined) return undefined;
    let language;
    language = Object.values(Language).forEach((value) => {
        if (value == parsed) return value;
    });
    if (language == undefined) throw new BadRequestResponse();
    return language;
}

export function getSchoolId(raw: any, role: Role): number | null {
    const parsed = getIntOrNull(raw);
    if (role == Role.BUYER && parsed == null) throw new BadRequestResponse();
    return parsed;
}
