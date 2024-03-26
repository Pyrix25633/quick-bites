import {
    findUser,
    updateUserLanguage,
    updateUserPassword
} from "@/lib/database/user";
import * as bcrypt from "bcrypt";
import {
    getLanguageOrUndefined,
    getUserId
} from "@/lib/utils/semantic-validation";
import {
    getNonEmptyStringOrUndefined,
    getObject
} from "@/lib/utils/type-validation";
import {
    BadRequestResponse,
    InternalServerErrorResponse,
    NoContentNextResponse,
    UnauthorizedResponse
} from "@/lib/web/response";
import { NextResponse } from "next/server";
import { localeCookieName } from "@/i18n";

export async function PATCH(request: Request): Promise<Response> {
    try {
        const userId = getUserId();
        const json = getObject(await request.json());
        const password = getNonEmptyStringOrUndefined(json.password);
        const oldPassword = getNonEmptyStringOrUndefined(json.oldPassword);
        const language = getLanguageOrUndefined(json.language);
        if (password == undefined && language == undefined)
            throw new BadRequestResponse();
        const user = await findUser(userId);
        if (password != undefined) {
            if (oldPassword == undefined) throw new BadRequestResponse();
            if (!(await bcrypt.compare(oldPassword, user.passwordHash)))
                throw new UnauthorizedResponse();
            await updateUserPassword(userId, password);
        }
        const response = NoContentNextResponse.next();
        if (language != undefined) {
            await updateUserLanguage(userId, language);
            response.cookies.set(localeCookieName, language.toLowerCase());
        }
        return response;
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
