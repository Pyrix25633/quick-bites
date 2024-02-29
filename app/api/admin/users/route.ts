import {
    BadRequestResponse,
    CreatedResponse,
    InternalServerErrorResponse
} from "@/lib/web/response";
import { getNonEmptyString, getObject } from "@/lib/utils/type-validation";
import {
    getEmail,
    getRole,
    getSchoolId
} from "@/lib/utils/semantic-validation";
import { createUser } from "@/lib/database/user";
import { findSchool } from "@/lib/database/school";

export async function POST(request: Request) {
    try {
        const json = getObject(await request.json());
        const email = getEmail(json.email);
        const usernameMatch = email.match(/^(.+)@/);
        if (usernameMatch == null) throw new BadRequestResponse();
        const username = usernameMatch[1];
        const password = getNonEmptyString(json.password);
        const role = getRole(json.role);
        const schoolId = getSchoolId(json.schoolId, role);
        const school = schoolId == null ? null : await findSchool(schoolId);
        const user = await createUser(username, email, password, role, school);
        return new CreatedResponse({ id: user.id });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
