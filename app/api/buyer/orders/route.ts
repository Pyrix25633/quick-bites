import {
    BadRequestResponse,
    CreatedResponse,
    InternalServerErrorResponse
} from "@/lib/web/response";
import { Order, Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getInt, getObject } from "@/lib/utils/type-validation";
import { Decimal } from "@prisma/client/runtime/library";
import { createOrder } from "@/lib/database/order";
import {
    RequestProduct,
    createProductsOnOrders
} from "@/lib/database/products-on-orders";
import { subtractFromUserCredit } from "@/lib/database/user";

export async function POST(request: Request) {
    try {
        const userId = 0; //TODO: get user id
        const json = getObject(await request.json());
        const deliveryDay = new Date(getInt(json.deliveryDay)); //TODO: check that the order can be made for this date
        const products: RequestProduct[] = await getRequestProducts(json);
        let total = new Decimal(0);
        for (const product of products)
            total = total.add(product.piecePrice.mul(product.quantity));
        subtractFromUserCredit(userId, total);
        const order: Order = await createOrder(userId, deliveryDay);
        for (const product of products)
            await createProductsOnOrders(order.id, product);
        return new CreatedResponse({id: order.id});
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

async function getRequestProducts(json: any): Promise<RequestProduct[]> {
    let products: RequestProduct[] = [];
    for (const product of getObject(json.products)) {
        getInt(product.id);
        getInt(product.quantity);
        const p: Product | null = await prisma.product.findUnique({
            where: {
                id: product.id
            }
        });
        if (p == null) throw new BadRequestResponse();
        product.piecePrice = p.price;
        products = products.concat(product);
    }
    if (products.length == 0) throw new BadRequestResponse();
    return products;
}
