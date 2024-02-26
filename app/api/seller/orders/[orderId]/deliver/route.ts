import { datesReferToSameDay } from "@/lib/utils/date";
import {
    createForbiddenResponse,
    createNotFoundResponse,
    createOkResponse
} from "@/lib/web/response";
import { Order, PrismaClient } from "@prisma/client";

export async function POST(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    const orderId = parseInt(params.orderId);
    const prisma = new PrismaClient();
    const order: Order | null = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });
    if (order == null) return createNotFoundResponse();
    if (!order.checkedByBuyer) return createForbiddenResponse();
    if (!datesReferToSameDay(order.deliveryDay, new Date()))
        return createForbiddenResponse();
    await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            checkedBySeller: new Date()
        }
    });
    return createOkResponse();
}
