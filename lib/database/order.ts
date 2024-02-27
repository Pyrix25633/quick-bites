import { Order } from "@prisma/client";
import prisma from "../prisma";

export async function selectOrder(id: number): Promise<Order | null> {
    return await prisma.order.findUnique({
        where: {
            id: id
        }
    });
}

export async function createOrder(
    userId: number,
    deliveryDay: Date
): Promise<Order> {
    return await prisma.order.create({
        data: {
            userId: userId,
            deliveryDay: deliveryDay
        }
    });
}

export async function updateCheckedByBuyer(id: number): Promise<Order> {
    return await prisma.order.update({
        where: {
            id: id
        },
        data: {
            checkedByBuyer: true
        }
    });
}

export async function updateCheckedBySeller(
    id: number,
    date: Date
): Promise<Order> {
    return await prisma.order.update({
        where: {
            id: id
        },
        data: {
            checkedBySeller: date
        }
    });
}
