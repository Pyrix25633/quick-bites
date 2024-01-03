import DayButton from "@/lib/components/DayButton";
import OrderButton from "@/lib/components/OrderButton";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "See your orders and order food"
};

export default function Home() {
    const dates: Date[] = [];
    for (let i = 0; i < 20; i++)
        dates.push(
            new Date(new Date().getMilliseconds() + i * 1000 * 60 * 60 * 24)
        );
    const items = ["Fil. primavera", "Pan. cotoletta", "Toast"];

    return (
        <main className="container grid grid-cols-1 gap-y-8 py-4">
            <section className="space-y-2">
                <h2 className="text-5xl text-secondary-light">Ordina</h2>
                <div className="flex gap-1 overflow-scroll rounded-2xl bg-secondary-light p-2">
                    {dates.map((d, i) => (
                        <DayButton key={i} date={d} selected={i === 0} />
                    ))}
                </div>
            </section>
            <section className="space-y-2">
                <h2 className="text-5xl text-secondary-light">Ordini attivi</h2>
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
