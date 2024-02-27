import { selectOrder, updateCheckedByBuyer } from "@/lib/database/order";
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
    //TODO: verify that user owns the order
    try {
        const orderId = getInt(params.orderId);
        const order: Order | null = await selectOrder(orderId);
        verifyThatOrderDeliveryCanBeRequested(order);
        await updateCheckedByBuyer(orderId);
        return new OkResponse();
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

function verifyThatOrderDeliveryCanBeRequested(order: Order | null): void {
    if (order == null) throw new NotFoundResponse();
    if (datesReferToSameDay(order.deliveryDay, new Date()))
        throw new ForbiddenResponse();
    if (order.checkedByBuyer) throw new ForbiddenResponse();
}
