import {
    CreatedResponse,
    InternalServerErrorResponse,
    NotFoundResponse,
    UnprocessableContentResponse
} from "@/lib/web/response";
import {
    getIntOrNull,
    getNonEmptyString,
    getObject
} from "@/lib/utils/type-validation";
import { getEmail, getLanguage } from "@/lib/utils/semantic-validation";
import { findSchool as prismaFindSchool } from "@/lib/database/school";
import { createTempUser } from "@/lib/database/temp-user";
import { randomInt } from "crypto";

export async function POST(request: Request): Promise<Response> {
    try {
        const json = getObject(await request.json());
        const email = getEmail(json.email);
        const password = getNonEmptyString(json.password);
        const language = getLanguage(json.language);
        const schoolId = getIntOrNull(json.schoolId);
        const school = schoolId == null ? null : await findSchool(schoolId);
        const confirmationCode = Math.random() * 900000 + 100000; //TODO: send confirmation email
        const tempUser = await createTempUser(
            email,
            password,
            language,
            school,
            confirmationCode
        );
        return new CreatedResponse({ email: tempUser.email });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

async function findSchool(id: number) {
    try {
        return await prismaFindSchool(id);
    } catch (e: any) {
        if (e instanceof NotFoundResponse)
            throw new UnprocessableContentResponse();
        throw e;
    }
}
