import { Product } from "@prisma/client";
import prisma from "../prisma";
import { NotFoundResponse } from "../web/response";

export async function findProduct(id: number): Promise<Product> {
    const product: Product | null = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    if (product == null) throw new NotFoundResponse();
    return product;
}
