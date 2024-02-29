import { Product } from "@prisma/client";
import prisma from "../prisma";

export async function findProduct(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({
        where: {
            id: id
        }
    });
}
