import { BadRequestResponse } from "../web/response";

export function getObject(raw: any): any {
    if (raw == undefined || typeof raw != "object")
        throw new BadRequestResponse();
    return raw;
}

export function getInt(raw: any): number {
    if (raw == undefined || typeof raw != "number")
        throw new BadRequestResponse();
    if (!Number.isSafeInteger(raw)) throw new BadRequestResponse();
    return raw;
}

export function getIntOrNull(raw: any): number | null {
    if (raw !== null && (raw === undefined || typeof raw != "number"))
        throw new BadRequestResponse();
    if (raw == null) return null;
    if (!Number.isSafeInteger(raw)) throw new BadRequestResponse();
    return raw;
}

export function getFloat(raw: any): number {
    if (raw == undefined || typeof raw != "number")
        throw new BadRequestResponse();
    return raw;
}

export function getString(raw: any): string {
    if (raw == undefined || typeof raw != "string")
        throw new BadRequestResponse();
    return raw;
}

export function getNonEmptyString(raw: any): string {
    if (raw == undefined || typeof raw != "string")
        throw new BadRequestResponse();
    if (raw.length == 0) throw new BadRequestResponse();
    return raw;
}
