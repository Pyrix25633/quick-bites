"use client";

import React, { useContext } from "react";
import { NewOrderContext } from "./NewOrderContext";
import Link from "next/link";

type ProductsWithQuantitiesProps = {
    fallback: React.ReactNode;
};

export default function ProductsWithQuantities({
    fallback
}: ProductsWithQuantitiesProps) {
    const productsQuantities = useContext(NewOrderContext);

    const components = Array.from(productsQuantities, ([p, q], i) => (
        <ProductWithQuantityButton key={i} quantity={q} product={p} />
    ));

    return components.length > 0 ? components : fallback;
}

type ProductWithQuantityButtonProps = {
    quantity: number;
    product: {
        name: string;
        id: number;
    };
};

function ProductWithQuantityButton({
    quantity,
    product: { name, id }
}: ProductWithQuantityButtonProps) {
    return (
        <Link
            href={"./new/select-quantity?productId=" + id}
            className="flex w-36 shrink-0 flex-col items-center rounded-2xl bg-secondary-dark p-2 text-center text-primary hover:cursor-pointer hover:bg-primary hover:text-secondary-light"
        >
            <div className="text-xl">{name}</div>
            <div className="text-2xl">&times;{quantity}</div>
        </Link>
    );
}
