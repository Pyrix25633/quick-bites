"use client";

import { Product } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type ProductsWithQuantities = Map<Product, number>;

export const NewOrderContext = createContext<ProductsWithQuantities>(new Map());
export const NewOrderDispatchContext = createContext<
    Dispatch<SetStateAction<ProductsWithQuantities>>
>(() => {});

export function NewOrderProvider({ children }: React.PropsWithChildren) {
    const [products, setProducts] = useState<ProductsWithQuantities>(new Map());

    return (
        <NewOrderContext.Provider value={products}>
            <NewOrderDispatchContext.Provider value={setProducts}>
                {children}
            </NewOrderDispatchContext.Provider>
        </NewOrderContext.Provider>
    );
}
