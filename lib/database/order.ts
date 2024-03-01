import { Order } from "@prisma/client";
import prisma from "../prisma";
import { randomInt } from "crypto";
import { NotFoundResponse } from "../web/response";

const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

export async function selectOrder(id: number): Promise<Order> {
    const order = await prisma.order.findUnique({
        where: {
            id: id
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

export async function updateCheckedByBuyer(id: number): Promise<Order> {
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
                    checkedByBuyer: true,
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
    return chars[randomInt(chars.length)];
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
