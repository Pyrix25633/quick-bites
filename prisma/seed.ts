import {
    Order,
    Prisma,
    PrismaClient,
    Product,
    School,
    User
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";
import { randomInt } from "crypto";
import { getNextDay, getPreviousDay } from "../lib/utils/date";

const prisma = new PrismaClient();
const schools: School[] = [];
let itt: School, ite: School, ipsia: School;
const users: User[] = [];
const products: Product[] = [];

async function main() {
    console.log("Seeding 'School'...");
    await upsertSchools();
    console.log("'School' seeded");

    console.log("Seeding 'User'...");
    await upsertUsers();
    for (let i = 0; i < 100; i++) {
        upsertFakeUser();
    }
    console.log("'User' seeded");

    console.log("Seeding 'Product'");
    for (let i = 0; i < 20; i++) {
        await upsertFakeProduct();
    }
    console.log("'Product' seeded");

    console.log("Seeding 'Order'");
    for (let i = 0; i < 100; i++) {
        await upsertFakeOrder();
    }
    console.log("'Order' seeded");
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

async function upsertSchools() {
    itt = await prisma.school.upsert({
        where: { name: "ITT Vittorio Veneto" },
        update: {},
        create: {
            name: "ITT Vittorio Veneto"
        }
    });
    schools.push(itt);
    ite = await prisma.school.upsert({
        where: { name: "ITE Vittorio Veneto" },
        update: {},
        create: {
            name: "ITE Vittorio Veneto"
        }
    });
    schools.push(ite);
    ipsia = await prisma.school.upsert({
        where: { name: "IPSIA Vittorio Veneto" },
        update: {},
        create: {
            name: "IPSIA Vittorio Veneto"
        }
    });
    schools.push(ipsia);
}

async function upsertUsers() {
    const lorenzo = await prisma.user.upsert({
        where: { username: "lorenzo.ianotto" },
        update: {},
        create: {
            username: "lorenzo.ianotto",
            passwordHash: await bcrypt.hash("Ian8@", 12),
            email: "lorenzo.ianotto@iisvittorioveneto.it",
            role: "BUYER",
            credit: new Prisma.Decimal(50.4),
            school: {
                connect: itt
            }
        }
    });
    users.push(lorenzo);
    const mattia = await prisma.user.upsert({
        where: { username: "mattia.biral" },
        update: {},
        create: {
            username: "mattia.biral",
            passwordHash: await bcrypt.hash("@Biral#", 12),
            email: "mattia.biral@iisvittorioveneto.it",
            role: "BUYER",
            credit: new Prisma.Decimal(50.2),
            school: {
                connect: itt
            }
        }
    });
    users.push(mattia);
    const tony = await prisma.user.upsert({
        where: { username: "tony.fassina" },
        update: {},
        create: {
            username: "tony.fassina",
            passwordHash: await bcrypt.hash("F4ss1n4", 12),
            email: "tony.fassina@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(20.4),
            school: {
                connect: ipsia
            }
        }
    });
    users.push(tony);
    const silvio = await prisma.user.upsert({
        where: { username: "silvio.denardi" },
        update: {},
        create: {
            username: "silvio.denardi",
            passwordHash: await bcrypt.hash("Paolone", 12),
            email: "silvio.denardi@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(69.4),
            school: {
                connect: ite
            }
        }
    });
    users.push(silvio);
    const cincia = await prisma.user.upsert({
        where: { username: "cincia.fosforo" },
        update: {},
        create: {
            username: "cincia.fosforo",
            passwordHash: await bcrypt.hash("Botecia", 12),
            email: "cincia.fosforo@example.com",
            role: "BUYER",
            credit: new Prisma.Decimal(10.4),
            school: {
                connect: ite
            }
        }
    });
    users.push(cincia);
    const simon = await prisma.user.upsert({
        where: { username: "simon.tacastaca" },
        update: {},
        create: {
            username: "simon.tacastaca",
            passwordHash: await bcrypt.hash("CiStannoTracciando", 12),
            email: "simon.tacastaca@example.com",
            role: "SELLER",
            credit: new Prisma.Decimal(190.4),
            school: {
                connect: ipsia
            }
        }
    });
    users.push(simon);
}

async function upsertFakeUser() {
    let error: boolean;
    let user: User;
    do {
        try {
            const username =
                faker.person.firstName().toLowerCase() +
                "." +
                faker.person.lastName().toLowerCase();
            user = await prisma.user.upsert({
                where: {
                    username: username
                },
                update: {},
                create: {
                    username: username,
                    passwordHash: await bcrypt.hash(
                        faker.internet.password(),
                        12
                    ),
                    email: username + "@iisvittorioveneto.it",
                    role: "BUYER",
                    credit: new Prisma.Decimal(
                        faker.finance.amount({ min: 2, max: 60 })
                    ),
                    school: {
                        connect: schools[randomInt(1, 4)]
                    }
                }
            });
            error = false;
            users.push(user);
        } catch (e) {
            error = true;
        }
    } while (error);
}

async function upsertFakeProduct() {
    let product: Product;
    let error: boolean;
    do {
        try {
            const name = faker.commerce.productName();
            product = await prisma.product.upsert({
                where: {
                    name: name
                },
                update: {},
                create: {
                    name: name,
                    price: new Prisma.Decimal(
                        faker.finance.amount({ min: 1, max: 4 })
                    ),
                    description: faker.commerce.productDescription(),
                    orderAdvance: randomInt(0, 19 * 2) * 30
                }
            });
            error = false;
            products.push(product);
        } catch (e) {
            error = true;
        }
    } while (error);
}

async function upsertFakeOrder() {
    let error;
    do {
        try {
            const max = new Date("2025/12/31 23:59:59");
            const createdAt: Date = faker.date.between({
                from: new Date("2020"),
                to: getPreviousDay(max)
            });
            const deliveryDay: Date = faker.date.between({
                from: getNextDay(createdAt),
                to: max
            });
            const order: Order = await prisma.order.create({
                data: {
                    createdAt: createdAt,
                    deliveryDay: deliveryDay,
                    user: {
                        connect: users[randomInt(users.length)]
                    }
                }
            });
            const numberOfProducts = randomInt(1, 6);
            for (let i = 0; i < numberOfProducts; i++) {
                const product: Product = products[randomInt(products.length)];
                await prisma.productsOnOrders.create({
                    data: {
                        order: {
                            connect: { id: order.id }
                        },
                        product: {
                            connect: product
                        },
                        quantity: randomInt(1, 6),
                        piecePrice: product.price
                    }
                });
            }
            error = false;
        } catch (e) {
            error = true;
        }
    } while (error);
}
