import { ProductCard } from "@/lib/components/ProductCard";
import {
    Order,
    Prisma,
    PrismaClient,
    Product,
    ProductsOnOrders,
    User
} from "@prisma/client";

type OrderPageProps = {
    params: {
        orderDetails: string[];
    };
};

export default async function OrderPage({
    params: { orderDetails }
}: OrderPageProps) {
    const prisma = new PrismaClient();
    const order = orderDetails?.at(0)
        ? await prisma.order.findUnique({
              where: { id: parseInt(orderDetails[0]) },
              include: {
                  user: true,
                  products: {
                      include: {
                          product: true
                      }
                  }
              }
          })
        : null;

    return (
        <main className="container flex flex-col gap-8 py-8">
            <section className="max-w-md space-y-2">
                <h2 className="text-4xl text-secondary-light">
                    Consegna ordine
                </h2>
                <div className="grid grid-cols-2 gap-x-2 rounded-2xl bg-secondary-light p-2">
                    <input
                        autoFocus
                        placeholder="Codice"
                        className="w-full self-center rounded-lg border-0 bg-secondary-dark px-4 py-2 text-center text-2xl text-primary placeholder-current placeholder-opacity-5 focus:placeholder-transparent focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="h-full self-center rounded-lg bg-primary text-2xl text-secondary-light"
                    >
                        Cerca
                    </button>
                </div>
            </section>
            {order && <OrderSection order={order} />}
        </main>
    );
}

type OrderSectionProps = {
    order: Order & {
        user: User;
        products: Array<
            ProductsOnOrders & {
                product: Product;
            }
        >;
    };
};

function OrderSection({ order }: OrderSectionProps) {
    const totalAmount = order.products.reduce(
        (p, c) => c.piecePrice.mul(c.quantity).add(p),
        new Prisma.Decimal(0)
    );

    return (
        <section className="flex flex-col gap-3 rounded-2xl bg-secondary-light p-2">
            <div className="flex justify-between px-2 text-2xl text-primary">
                <div>{order.user.username}</div>
                <div className="font-bold">€{totalAmount.toString()}</div>
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
                {order.products.map((p, i) => (
                    <ProductCard
                        key={i}
                        name={p.product.name}
                        count={p.quantity}
                    />
                ))}
            </div>
            {order.checkedBySeller ? (
                <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                    Già consegnato
                </div>
            ) : (
                <button
                    type="submit"
                    className="self-center rounded-lg bg-primary px-4 py-2 text-2xl text-secondary-light hover:bg-opacity-50"
                    // onClick={() => setOrderDelivered(true)}
                >
                    Consegna
                </button>
            )}
        </section>
    );
}
