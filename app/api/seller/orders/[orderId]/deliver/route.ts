import { PrismaClient } from "@prisma/client";

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
    const prisma = new PrismaClient();
    prisma.order.update({
        where: {
            id: parseInt(params.orderId)
        },
        data: {
            checkedBySeller: new Date()
        }
    });
    return new Response();
}