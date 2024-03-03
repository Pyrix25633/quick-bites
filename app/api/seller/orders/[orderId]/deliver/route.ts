import { protectRoute } from "@/lib/auth";
import { selectOrder, updateCheckedBySeller } from "@/lib/database/order";
import { datesReferToSameDay } from "@/lib/utils/date";
import { getInt } from "@/lib/utils/type-validation";
import {
    InternalServerErrorResponse,
    OkResponse,
    UnprocessableContentResponse
} from "@/lib/web/response";
import { Order } from "@prisma/client";

export async function POST(
    _request: Request,
    { params }: { params: { orderId: string } }
): Promise<Response> {
    try {
        await protectRoute(["SELLER"]);
        const orderId = getInt(params.orderId);
        const date = new Date();
        const order: Order = await selectOrder(orderId);
        verifyThatOrderCanBeDelivered(order, date);
        await updateCheckedBySeller(orderId, date);
        return new OkResponse();
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

function verifyThatOrderCanBeDelivered(order: Order, date: Date): void {
    if (!order.checkedByBuyer) throw new UnprocessableContentResponse();
    if (order.checkedBySeller != null) throw new UnprocessableContentResponse();
    if (!datesReferToSameDay(order.deliveryDay, date))
        throw new UnprocessableContentResponse();
}
