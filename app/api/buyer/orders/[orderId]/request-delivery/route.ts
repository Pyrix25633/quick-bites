import { datesReferToSameDay } from "@/lib/utils/date";
import {
    ForbiddenResponse,
    NotFoundResponse,
    OkResponse
} from "@/lib/web/response";
import { Order } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(
    _request: Request,
    { params }: { params: { orderId: string } }
) {
    //TODO: verify that user owns the order
    const orderId = parseInt(params.orderId);
    const order: Order | null = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });
    if (order == null) return new NotFoundResponse();
    if (datesReferToSameDay(order.deliveryDay, new Date()))
        return new ForbiddenResponse();
    if (order.checkedByBuyer) return new ForbiddenResponse();
    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            checkedByBuyer: true
        }
    });
    return new OkResponse();
}
