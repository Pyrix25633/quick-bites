import { BadRequestResponse, OkResponse } from "@/lib/web/response";
import { Order, PrismaClient, Product } from "@prisma/client";

export async function POST(request: Request) {
    //TODO: get user id
    const userId = 0;
    const json = await request.json();
    if (json.deliveryDay == undefined || typeof json.deliveryDay != "number")
        return new BadRequestResponse();
    const deliveryDay = new Date(json.deliveryDay); //TODO: check that the order can be made for this date
    let products: RequestProduct[] = [];
    if (json.products == undefined || typeof json.products == "object")
        return new BadRequestResponse();
    const prisma = new PrismaClient();
    try {
        for (const product of json.products) {
            if (product.id == undefined || typeof product.id != "number")
                return new BadRequestResponse();
            if (
                product.quantity == undefined ||
                typeof product.quantity != "number"
            )
                return new BadRequestResponse();
            const p: Product | null = await prisma.product.findUnique({
                where: {
                    id: product.id
                }
            });
            if (p == null) return new BadRequestResponse();
            product.piecePrice = p.price;
            products = products.concat(product);
        }
    } catch (e) {
        return new BadRequestResponse();
    }
    const order: Order = await prisma.order.create({
        data: {
            userId: userId,
            deliveryDay: deliveryDay
        }
    });
    for (const product of products) {
        prisma.productsOnOrders.create({
            data: {
                orderId: order.id,
                productId: product.id,
                quantity: product.quantity,
                piecePrice: product.piecePrice
            }
        });
    }
    return new OkResponse();
}

type RequestProduct = {
    id: number;
    quantity: number;
    piecePrice: number;
};
