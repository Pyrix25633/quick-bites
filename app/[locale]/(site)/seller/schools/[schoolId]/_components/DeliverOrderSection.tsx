"use client";
import { ProductCard } from "@/lib/components/ProductCard";
import { useTranslations } from "next-intl";
import { useState } from "react";

type DeliverOrderSectionProps = {
    schoolId: number;
};

export default function DeliverOrderSection({
    schoolId
}: DeliverOrderSectionProps) {
    const t = useTranslations("components.deliver-order-section");
    const items = ["Filone primavera pomodoro", "Pan. cotoletta", "Toast"];
    const [orderDelivered, setOrderDelivered] = useState(false);

    return (
        <section className="space-y-2">
            <h2 className="text-4xl text-secondary-light">
                {t("deliver-order")}
            </h2>
            <div className="grid grid-cols-2 gap-x-2 rounded-2xl bg-secondary-light p-2">
                <input
                    autoFocus
                    placeholder={t("code")}
                    className="w-full self-center rounded-lg border-0 bg-secondary-dark px-4 py-2 text-center text-2xl text-primary placeholder-current placeholder-opacity-5 focus:placeholder-transparent focus:ring-primary"
                />
                <button
                    type="submit"
                    className="h-full self-center rounded-lg bg-primary text-2xl text-secondary-light"
                >
                    {t("search")}
                </button>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-secondary-light p-2">
                <div className="flex justify-between px-2 text-2xl text-primary">
                    <div>Mario Giovanni</div>
                    <div className="font-bold">€53,2</div>
                </div>
                {items.map((p, i) => (
                    <ProductCard key={i} name={p} count={4} />
                ))}
                {orderDelivered ? (
                    <div className="self-center px-4 py-2 text-2xl font-bold text-primary">
                        {t("already-delivered")}
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="self-center rounded-lg bg-primary px-4 py-2 text-2xl text-secondary-light hover:bg-opacity-50"
                        onClick={() => setOrderDelivered(true)}
                    >
                        {t("deliver")}
                    </button>
                )}
            </div>
        </section>
    );
}
