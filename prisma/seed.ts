import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const itt = await prisma.school.upsert({
        where: { name: "ITT Vittorio Veneto" },
        update: {},
        create: {
            name: "ITT Vittorio Veneto"
        }
    });

    const ite = await prisma.school.upsert({
        where: { name: "ITE Vittorio Veneto" },
        update: {},
        create: {
            name: "ITE Vittorio Veneto"
        }
    });

    const ipsia = await prisma.school.upsert({
        where: { name: "IPSIA Vittorio Veneto" },
        update: {},
        create: {
            name: "IPSIA Vittorio Veneto"
        }
    });

    const lorenzo = await prisma.user.upsert({
        where: { username: "lorenzo.ianotto" },
        update: {},
        create: {
            username: "lorenzo.ianotto",
            passwordHash:
                "$2a$12$77GyV3xyf8.Rq/W7qdWJs.ReFSN9mDtJXecxpO8GchEfGdtj609gK",
            email: "lorenzo.ianotto@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(50.4),
            school: {
                connect: itt
            }
        }
    });

    await prisma.user.upsert({
        where: { username: "mattia.ianotto" },
        update: {},
        create: {
            username: "mattia.ianotto",
            passwordHash:
                "$2a$12$0sRXBvUhFcc/cTGgpQx3tOaU9K/IRXLRAF4oihEJfGDnY9TjYXF36",
            email: "mattia.ianotto@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(50.2),
            school: {
                connect: itt
            }
        }
    });

    const tony = await prisma.user.upsert({
        where: { username: "tony.fassina" },
        update: {},
        create: {
            username: "tony.fassina",
            passwordHash:
                "$2a$12$77GyV3xyf8.Rq/W7qdWJs.ReFSN9mDtJXecxpO8GchEfGdtj609cL",
            email: "tony.fassina@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(20.4),
            school: {
                connect: ipsia
            }
        }
    });

    const silvio = await prisma.user.upsert({
        where: { username: "silvio.denardi" },
        update: {},
        create: {
            username: "silvio.denardi",
            passwordHash:
                "$2a$12$77GyV3xyf8.Rq/W7qdWJs.ReFSN9mDtJXecxpO8GchEfGdtj610tY",
            email: "silvio.denardi@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(69.4),
            school: {
                connect: ite
            }
        }
    });

    const cincia = await prisma.user.upsert({
        where: { username: "cincia.fosforo" },
        update: {},
        create: {
            username: "cincia.fosforo",
            passwordHash:
                "$2a$12$77GyV3xyf8.Rq/W7qdWJs.ReFSN9mDtJXecxpO8GchEfGdtj678bO",
            email: "cincia.fosforo@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(10.4),
            school: {
                connect: ite
            }
        }
    });

    const simon = await prisma.user.upsert({
        where: { username: "simon.tacastaca" },
        update: {},
        create: {
            username: "simon.tacastaca",
            passwordHash:
                "$2a$12$77GyV3xyf8.Rq/W7qdWJs.ReFSN9mDtJXecxpO8GchEfGdtj645rT",
            email: "simon.tacastaca@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(190.4),
            school: {
                connect: ipsia
            }
        }
    });

    const francesco = await prisma.user.upsert({
        where: { username: "francesco.basso" },
        update: {},
        create: {
            username: "francesco.basso",
            passwordHash:
                "$2a$12$77GyV3xyf8.Rq/W7qdWJs.ReFSN9mDtJXecxpO8GchEfGdtj656eW",
            email: "francesco.basso@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(80.3),
            school: {
                connect: ipsia 
            }
        }
    });

    const pizza = await prisma.product.upsert({
        where: { name: "Pizza wurstel" },
        update: {},
        create: {
            name: "Pizza wurstel",
            description: "Pizza al trancio con i wurstel",
            price: new Prisma.Decimal(1.2)
        }
    });

    const filone_primavera = await prisma.product.upsert({
        where: { name: "Filone primavera" },
        update: {},
        create: {
            name: "Filone primavera",
            description: "Filone con la primavera dentro",
            price: new Prisma.Decimal(2.2)
        }
    });

    await prisma.order.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            deliveryDay: new Date(),
            userId: lorenzo.id,
            products: {
                createMany: {
                    data: [
                        {
                            productId: pizza.id,
                            quantity: 3,
                            piecePrice: pizza.price
                        },
                        {
                            productId: filone_primavera.id,
                            quantity: 2,
                            piecePrice: filone_primavera.price
                        }
                    ]
                }
            }
        }
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
