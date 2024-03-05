import { Order } from "@prisma/client";
import prisma from "../prisma";
import { randomInt } from "crypto";
import { NotFoundResponse } from "../web/response";

export const deliveryCodeChars = "abcdefghijklmnopqrstuvwxyz0123456789";

export async function findOrder(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
        where: {
            id: id
        }
    });
    if (order == null) throw new NotFoundResponse();
    return order;
}

export async function findOrderFromDeliveryCode(
    deliveryCode: string
): Promise<Order> {
    const order = await prisma.order.findUnique({
        where: {
            deliveryCode: deliveryCode
        }
    });
    if (order == null) throw new NotFoundResponse();
    return order;
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

export async function updateDeliveryCode(id: number): Promise<Order> {
    let deliverycode: string;
    let order: Order | null;
    do {
        try {
            deliverycode = generateDeliveryCode();
            order = await prisma.order.update({
                where: {
                    id: id
                },
                data: {
                    deliveryCode: deliverycode
                }
            });
        } catch (e) {
            order = null;
        }
    } while (order == null);
    return order;
}

export function generateDeliveryCode(): string {
    let deliveryCode = "";
    for (let i = 0; i < 4; i++) deliveryCode += generateChar();
    return deliveryCode;
}

function generateChar(): string {
    return deliveryCodeChars[randomInt(deliveryCodeChars.length)];
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
