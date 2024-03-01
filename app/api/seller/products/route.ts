import { createProduct } from "@/lib/database/product";
import { getDecimal } from "@/lib/utils/semantic-validation";
import { getNonEmptyString, getObject } from "@/lib/utils/type-validation";
import {
    CreatedResponse,
    InternalServerErrorResponse,
    UnprocessableContentResponse
} from "@/lib/web/response";

export async function POST(request: Request): Promise<Response> {
    try {
        const json = getObject(await request.json());
        const name = getNonEmptyString(json.name);
        const description = getNonEmptyString(json.name);
        const price = getDecimal(json.price);
        if (price.greaterThan(10)) throw new UnprocessableContentResponse();
        const product = await createProduct(name, description, price);
        return new CreatedResponse({ id: product.id });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}
