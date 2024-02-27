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
    const orderId = parseInt(params.orderId);
    const date = new Date();
    const order: Order | null = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });
    if (order == null) return new NotFoundResponse();
    if (!order.checkedByBuyer) return new ForbiddenResponse();
    if (order.checkedBySeller != null) return new ForbiddenResponse();
    if (!datesReferToSameDay(order.deliveryDay, date))
        return new ForbiddenResponse();
    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            checkedBySeller: date
        }
    });
    return new OkResponse();
}
