import { deleteTempUser, findTempUser } from "@/lib/database/temp-user";
import { createUser, createUserFromTempUser } from "@/lib/database/user";
import { getEmail } from "@/lib/utils/semantic-validation";
import { getInt, getObject } from "@/lib/utils/type-validation";
import {
    CreatedResponse,
    InternalServerErrorResponse,
    UnprocessableContentResponse
} from "@/lib/web/response";

export async function POST(
    request: Request,
    { params }: { params: { email: string } }
): Promise<Response> {
    try {
        const json = getObject(await request.json());
        const email = getEmail(params.email);
        const confirmationCode = getInt(json.confirmationCode);
        const tempUser = await findTempUser(email);
        if (tempUser.confirmationCode != confirmationCode)
            throw new UnprocessableContentResponse();
        const user = await createUserFromTempUser(tempUser);
        await deleteTempUser(email);
        return new CreatedResponse({ id: user.id });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
