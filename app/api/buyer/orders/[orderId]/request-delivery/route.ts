import { selectOrder, updateCheckedByBuyer } from "@/lib/database/order";
import { datesReferToSameDay } from "@/lib/utils/date";
import { getUserId } from "@/lib/utils/semantic-validation";
import { getInt } from "@/lib/utils/type-validation";
import {
    ForbiddenResponse,
    InternalServerErrorResponse,
    NotFoundResponse,
    OkResponse,
    UnauthorizedResponse
} from "@/lib/web/response";
import { Order } from "@prisma/client";

export async function POST(
    _request: Request,
    { params }: { params: { orderId: string } }
): Promise<Response> {
    try {
        const userId = getUserId();
        const orderId = getInt(params.orderId);
        const order: Order = await selectOrder(orderId);
        verifyThatOrderDeliveryCanBeRequested(order, userId);
        return new OkResponse({
            deliveryCode: (await updateCheckedByBuyer(orderId)).deliveryCode
        });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

function verifyThatOrderDeliveryCanBeRequested(
    order: Order,
    userId: number
): void {
    if (order.userId != userId) throw new UnauthorizedResponse();
    if (datesReferToSameDay(order.deliveryDay, new Date()))
        throw new ForbiddenResponse();
    if (order.checkedByBuyer) throw new ForbiddenResponse();
}
