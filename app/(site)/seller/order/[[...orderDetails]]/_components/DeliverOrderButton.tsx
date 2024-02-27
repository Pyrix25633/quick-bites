"use client";

import axios from "axios";
import { useState } from "react";

//  At the moment NextJS doesn't support passing Decimals as props to client components.
type DeliverOrderButtonProps = {
    order: {
        id: number;
        checkedBySeller: Date | null;
        checkedByBuyer: boolean;
        deliveryDay: Date;
    };
};

export default function DeliverOrderButton({ order }: DeliverOrderButtonProps) {
    const [checkedBySeller, setCheckedBySeller] = useState(
        order.checkedBySeller !== null
    );
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function deliverOrder() {
        setLoading(true);
        axios
            .post("/api/seller/orders/" + order.id + "/deliver", {
                id: order.id
            })
            .then((_) => {
                setCheckedBySeller(true);
            })
            .catch((_) => {
                setErrorMessage("Errore lato server");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (isLoading) {
        return (
            <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                In corso...
            </div>
        );
    }

    if (checkedBySeller) {
        return (
            <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                Già consegnato
            </div>
        );
    }

    if (!order.checkedByBuyer) {
        return (
            <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                Il compratore deve richiedere il ritiro
            </div>
        );
    }

    if (!isSameDay(order.deliveryDay, new Date())) {
        return (
            <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                Non per oggi
            </div>
        );
    }

    if (errorMessage !== null) {
        return (
            <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                {errorMessage}
            </div>
        );
    }

    return (
        <button
            type="submit"
            className="self-center rounded-lg bg-primary px-4 py-2 text-2xl text-secondary-light hover:bg-opacity-50"
            disabled={isLoading}
            onClick={deliverOrder}
        >
            Consegna
        </button>
    );
}

function isSameDay(d1: Date, d2: Date) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}
