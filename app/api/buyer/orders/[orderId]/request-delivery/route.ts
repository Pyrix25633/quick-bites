import { protectRoute } from "@/lib/auth";
import { findOrder, updateDeliveryCode } from "@/lib/database/order";
import { datesReferToSameDay } from "@/lib/utils/date";
import { getInt } from "@/lib/utils/type-validation";
import {
    ForbiddenResponse,
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
        const userId = await protectRoute(["BUYER"]);
        const orderId = getInt(params.orderId);
        const order: Order = await findOrder(orderId);
        verifyThatOrderDeliveryCanBeRequested(order, userId);
        return new OkResponse({
            deliveryCode: (await updateDeliveryCode(orderId)).deliveryCode
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
    if (order.userId != userId) throw new ForbiddenResponse();
    if (!datesReferToSameDay(order.deliveryDay, new Date()))
        throw new UnprocessableContentResponse();
    if (order.deliveryCode != null) throw new UnprocessableContentResponse();
}
