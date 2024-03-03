import {
    BadRequestResponse,
    CreatedResponse,
    InternalServerErrorResponse,
    UnprocessableContentResponse
} from "@/lib/web/response";
import { Order, Product } from "@prisma/client";
import { getInt, getObject } from "@/lib/utils/type-validation";
import { Decimal } from "@prisma/client/runtime/library";
import { createOrder } from "@/lib/database/order";
import {
    RequestProduct,
    createProductsOnOrders
} from "@/lib/database/products-on-orders";
import { subtractFromUserCredit } from "@/lib/database/user";
import { findProduct } from "@/lib/database/product";
import { protectRoute } from "@/lib/auth";

const orderDeadline = new Date("1970/01/01 10:15:00");

export async function POST(request: Request): Promise<Response> {
    try {
        const userId = await protectRoute(["BUYER"]);
        const json = getObject(await request.json());
        const currentDate = new Date();
        const deliveryDay = new Date(getInt(json.deliveryDay)); //TODO: check that the order can be made for this date
        const products: RequestProduct[] = await getRequestProducts(
            json,
            currentDate,
            deliveryDay
        );
        let total = new Decimal(0);
        for (const product of products)
            total = total.add(product.piecePrice.mul(product.quantity));
        subtractFromUserCredit(userId, total);
        const order: Order = await createOrder(userId, deliveryDay);
        for (const product of products)
            await createProductsOnOrders(order.id, product);
        return new CreatedResponse({ id: order.id });
    } catch (e: any) {
        if (e instanceof Response) return e;
        return new InternalServerErrorResponse();
    }
}

async function getRequestProducts(
    json: any,
    currentDate: Date,
    deliveryDay: Date
): Promise<RequestProduct[]> {
    let products: RequestProduct[] = [];
    for (const product of getObject(json.products)) {
        getInt(product.id);
        getInt(product.quantity);
        try {
            const p: Product = await findProduct(product.id);
            if (!orderIsInTime(currentDate, deliveryDay, p.orderAdvance))
                throw new UnprocessableContentResponse();
            product.piecePrice = p.price;
            products = products.concat(product);
        } catch (e: any) {
            throw new UnprocessableContentResponse();
        }
    }
    if (products.length == 0) throw new BadRequestResponse();
    return products;
}

export function orderIsInTime(
    currentDate: Date,
    deliveryDay: Date,
    productOrderAdvance: number
): boolean {
    const deadline = new Date(
        deliveryDay.getFullYear(),
        deliveryDay.getMonth(),
        deliveryDay.getDate(),
        orderDeadline.getHours(),
        orderDeadline.getMinutes() - productOrderAdvance
    );
    return currentDate <= deadline;
}
