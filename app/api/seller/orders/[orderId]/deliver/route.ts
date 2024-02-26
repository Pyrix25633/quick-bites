import { datesReferToSameDay } from "@/lib/utils/date";
import {
    ForbiddenResponse,
    NotFoundResponse,
    OkResponse
} from "@/lib/web/response";
import { Order, PrismaClient } from "@prisma/client";

export async function POST(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    const orderId = parseInt(params.orderId);
    const date = new Date();
    const prisma = new PrismaClient();
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
