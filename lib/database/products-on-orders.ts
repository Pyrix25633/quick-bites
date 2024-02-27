import { ProductsOnOrders } from "@prisma/client";
import prisma from "../prisma";
import { Decimal } from "@prisma/client/runtime/library";

export async function createProductsOnOrders(
    orderId: number,
    product: RequestProduct
): Promise<ProductsOnOrders> {
    return await prisma.productsOnOrders.create({
        data: {
            orderId: orderId,
            productId: product.id,
            quantity: product.quantity,
            piecePrice: product.piecePrice
        }
    });
}

export type RequestProduct = {
    id: number;
    quantity: number;
    piecePrice: Decimal;
};
