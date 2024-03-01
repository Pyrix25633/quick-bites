import { Product } from "@prisma/client";
import prisma from "../prisma";
import {
    ForbiddenResponse,
    NotFoundResponse,
    UnprocessableContentResponse
} from "../web/response";
import { Decimal } from "@prisma/client/runtime/library";

export async function findProduct(id: number): Promise<Product> {
    const product: Product | null = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    if (product == null) throw new NotFoundResponse();
    return product;
}

export async function createProduct(
    name: string,
    description: string,
    price: Decimal
): Promise<Product> {
    try {
        return await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: price
            }
        });
    } catch (e: any) {
        throw new UnprocessableContentResponse();
    }
}
