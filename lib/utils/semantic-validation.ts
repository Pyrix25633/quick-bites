import { Language, Role } from "@prisma/client";
import { getUserId as getUserIdOrNull } from "../auth";
import {
    getNonEmptyString,
    getNonEmptyStringOrUndefined
} from "./type-validation";
import { BadRequestResponse, UnauthorizedResponse } from "../web/response";
import { Decimal } from "@prisma/client/runtime/library";
import { deliveryCodeChars } from "../database/order";

export const schoolEmailDomain = "iisvittorioveneto.it";

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

export function getSchoolEmail(raw: any): string {
    const parsed = getNonEmptyString(raw);
    if (
        parsed.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@/ +
                schoolEmailDomain +
                /$/
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

export function getLanguage(raw: any): Language {
    const parsed = getNonEmptyString(raw);
    let language;
    Object.values(Language).forEach((value) => {
        if (value == parsed) language = value;
    });
    if (language == undefined) throw new BadRequestResponse();
    return language;
}

export function getLanguageOrUndefined(raw: any): Language | undefined {
    const parsed = getNonEmptyStringOrUndefined(raw);
    if (parsed === undefined) return undefined;
    let language;
    Object.values(Language).forEach((value) => {
        if (value == parsed) language = value;
    });
    if (language == undefined) throw new BadRequestResponse();
    return language;
}

export function getDecimal(raw: any): Decimal {
    const parsed = getNonEmptyString(raw);
    let decimal;
    try {
        decimal = new Decimal(parsed);
    } catch (e: any) {
        throw new BadRequestResponse();
    }
    if (!decimal.isFinite()) throw new BadRequestResponse();
    if (decimal.isNaN()) throw new BadRequestResponse();
    if (decimal.decimalPlaces() > 2) throw new BadRequestResponse();
    return decimal;
}

export function getDeliveryCode(raw: any): string {
    const parsed = getNonEmptyString(raw);
    if (parsed.length != 4) throw new BadRequestResponse();
    for (const c of parsed) {
        if (!deliveryCodeChars.includes(c)) throw new BadRequestResponse();
    }
    return parsed;
}
