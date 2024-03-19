import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import ProductsWithQuantities from "./_components/ProductsWithQuantities";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Nuovo ordine"
};

export default async function Home() {
    const products = await prisma.product.findMany();

    return (
        <main className="container grid grid-cols-1 gap-y-8 py-4">
            <section className="space-y-2">
                <h2 className="text-5xl text-secondary-light">Carrello</h2>
                <div className="flex gap-1 overflow-scroll rounded-2xl bg-secondary-light p-2">
                    <ProductsWithQuantities
                        fallback={
                            <span className="w-full text-center text-xl text-primary">
                                Carrello vuoto
                            </span>
                        }
                    />
                </div>
            </section>
            <section className="space-y-2">
                <h2 className="text-5xl text-secondary-light">Prodotti</h2>
                <div className="grid grid-cols-1 items-stretch gap-3 rounded-2xl bg-secondary-light p-2 md:grid-cols-2">
                    {products.map((p, i) => (
                        <ProductButton key={i} product={p} />
                    ))}
                </div>
            </section>
        </main>
    );
}

type ProductButtonProps = {
    product: Product;
};

function ProductButton({ product }: ProductButtonProps) {
    return (
        <Link
            href={"./new/select-quantity?productId=" + product.id}
            className="grid grid-cols-3 items-center gap-x-2 rounded-2xl bg-secondary-dark p-2 text-xl text-primary"
        >
            <div className="col-span-2 flex h-full flex-col items-center justify-evenly">
                <div className="text-3xl">{product.name}</div>
                <div>€{product.price.toFixed(2)}</div>
            </div>
            <div className="col-span-1 aspect-square w-full rounded-xl bg-white"></div>
        </Link>
    );
}
