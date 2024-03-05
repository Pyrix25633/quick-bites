import { Language, Role } from "@prisma/client";
import { getUserId as getUserIdOrNull } from "../auth";
import {
    getIntOrNull,
    getNonEmptyString,
    getNonEmptyStringOrUndefined
} from "./type-validation";
import { BadRequestResponse, UnauthorizedResponse } from "../web/response";
import { Decimal } from "@prisma/client/runtime/library";
import { deliveryCodeChars } from "../database/order";

export const emailDomain = "iisvittorioveneto.it";

export function getUserId(): number {
    const userId = getUserIdOrNull();
    if (userId == null) throw new UnauthorizedResponse();
    return userId;
}

export function getEmail(raw: any): string {
    const parsed = getNonEmptyString(raw);
    if (
        parsed.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@/ +
                emailDomain +
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
