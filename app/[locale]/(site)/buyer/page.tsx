import DayButton from "@/lib/components/DayButton";
import OrderButton from "@/lib/components/OrderButton";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.buyer.metadata");
    return { title: t("title"), description: t("description") };
}

export default function Buyer() {
    const t = useTranslations("pages.buyer");
    const dates: Date[] = [];
    for (let i = 0; i < 20; i++)
        dates.push(
            new Date(new Date().getMilliseconds() + i * 1000 * 60 * 60 * 24)
        );
    const items = ["Fil. primavera", "Pan. cotoletta", "Toast"];

    return (
        <main className="container grid grid-cols-1 gap-y-8 py-4">
            <section className="space-y-2">
                <h2 className="text-5xl text-secondary-light">
                    {t("new-order")}
                </h2>
                <div className="flex gap-1 overflow-scroll rounded-2xl bg-secondary-light p-2">
                    {dates.map((d, i) => (
                        <DayButton key={i} date={d} selected={i === 0} />
                    ))}
                </div>
            </section>
            <section className="space-y-2">
                <h2 className="text-5xl text-secondary-light">
                    {t("active-orders")}
                </h2>
                <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-secondary-light p-2">
                    {dates.map((d, i) => (
                        <OrderButton
                            key={i}
                            total={5.95}
                            date={d}
                            selected={i === 0}
                            items={items}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
