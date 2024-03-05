import { protectRoute } from "@/lib/auth";
import {
    findOrderFromDeliveryCode,
    updateCheckedBySeller
} from "@/lib/database/order";
import { datesReferToSameDay } from "@/lib/utils/date";
import { getDeliveryCode } from "@/lib/utils/semantic-validation";
import {
    InternalServerErrorResponse,
    OkResponse,
    UnprocessableContentResponse
} from "@/lib/web/response";
import { Order } from "@prisma/client";

export async function POST(
    _request: Request,
    { params }: { params: { deliveryCode: string } }
): Promise<Response> {
    try {
        await protectRoute(["SELLER"]);
        const deliveryCode = getDeliveryCode(params.deliveryCode);
        const date = new Date();
        const order: Order = await findOrderFromDeliveryCode(deliveryCode);
        verifyThatOrderCanBeDelivered(order, date);
        await updateCheckedBySeller(order.id, date);
        return new OkResponse();
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

function verifyThatOrderCanBeDelivered(order: Order, date: Date): void {
    if (order.checkedBySeller != null) throw new UnprocessableContentResponse();
    if (!datesReferToSameDay(order.deliveryDay, date))
        throw new UnprocessableContentResponse();
}
