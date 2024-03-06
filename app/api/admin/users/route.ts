import {
    BadRequestResponse,
    CreatedResponse,
    InternalServerErrorResponse
} from "@/lib/web/response";
import {
    getIntOrNull,
    getNonEmptyString,
    getObject
} from "@/lib/utils/type-validation";
import {
    getEmail,
    getLanguage,
    getRole
} from "@/lib/utils/semantic-validation";
import { createUser } from "@/lib/database/user";
import { findSchool } from "@/lib/database/school";
import { protectRoute } from "@/lib/auth";

export async function POST(request: Request): Promise<Response> {
    try {
        await protectRoute(["ADMIN"]);
        const json = getObject(await request.json());
        const email = getEmail(json.email);
        const usernameMatch = email.match(/^(.+)@/);
        if (usernameMatch == null) throw new BadRequestResponse();
        const username = usernameMatch[1];
        const password = getNonEmptyString(json.password);
        const language = getLanguage(json.language);
        const role = getRole(json.role);
        const schoolId = getIntOrNull(json.schoolId);
        const school = schoolId == null ? null : await findSchool(schoolId);
        const user = await createUser(
            username,
            email,
            password,
            language,
            role,
            school
        );
        return new CreatedResponse({ id: user.id });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
