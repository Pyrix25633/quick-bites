import { selectOrder, updateCheckedBySeller } from "@/lib/database/order";
import { datesReferToSameDay } from "@/lib/utils/date";
import { getInt } from "@/lib/utils/type-validation";
import {
    ForbiddenResponse,
    InternalServerErrorResponse,
    NotFoundResponse,
    OkResponse
} from "@/lib/web/response";
import { Order } from "@prisma/client";

export async function POST(
    _request: Request,
    { params }: { params: { orderId: string } }
): Promise<Response> {
    try {
        const orderId = getInt(params.orderId);
        const date = new Date();
        const order: Order | null = await selectOrder(orderId);
        verifyThatOrderCanBeDelivered(order, date);
        await updateCheckedBySeller(orderId, date);
        return new OkResponse();
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

function verifyThatOrderCanBeDelivered(order: Order | null, date: Date): void {
    if (order == null) throw new NotFoundResponse();
    if (!order.checkedByBuyer) throw new ForbiddenResponse();
    if (order.checkedBySeller != null) throw new ForbiddenResponse();
    if (!datesReferToSameDay(order.deliveryDay, date))
        throw new ForbiddenResponse();
}
