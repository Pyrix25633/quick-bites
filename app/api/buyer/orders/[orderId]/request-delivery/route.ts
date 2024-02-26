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
    //TODO: verify that user owns the order
    const orderId = parseInt(params.orderId);
    const prisma = new PrismaClient();
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
