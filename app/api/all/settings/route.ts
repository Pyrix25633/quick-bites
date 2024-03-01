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
    ForbiddenResponse,
    InternalServerErrorResponse,
    OkResponse,
    UnauthorizedResponse
} from "@/lib/web/response";
import { cookieName } from "@/i18n/settings";

export async function PATHC(request: Request): Promise<Response> {
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
        let response = new OkResponse();
        if (language != undefined) {
            await updateUserLanguage(userId, language);
            response.headers.append(
                "Set-Cookie",
                cookieName + "=" + language.toLowerCase()
            );
        }
        return new OkResponse();
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
