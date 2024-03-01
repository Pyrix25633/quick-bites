import DayButton from "@/lib/components/DayButton";
import { ProductCard } from "@/lib/components/ProductCard";
import { useTranslations } from "next-intl";

type ViewProductsSectionProps = {
    schoolId: number;
};

export default function ViewProductsSection({
    schoolId
}: ViewProductsSectionProps) {
    const t = useTranslations("components.view-products-section");
    const dates: Date[] = [];
    for (let i = 0; i < 20; i++)
        dates.push(
            new Date(new Date().getMilliseconds() + i * 1000 * 60 * 60 * 24)
        );
    const items = ["Filone primavera pomodoro", "Pan. cotoletta", "Toast"];

    return (
        <section className="space-y-4">
            <section className="space-y-2">
                <h2 className="text-4xl text-secondary-light">
                    {t("orders-per-day")}
                </h2>
                <div className="flex gap-1 overflow-scroll rounded-2xl bg-secondary-light p-2">
                    {dates.map((d, i) => (
                        <DayButton key={i} date={d} selected={i === 1} />
                    ))}
                </div>
            </section>
            <section className="space-y-2">
                {/* <h2 className="text-4xl text-secondary-light"> */}
                {/*     Ordinati per domani */}
                {/* </h2> */}
                {/* <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-secondary-light p-2"> */}
                {/* {items.map((p, i) => ( */}
                {/*     <ProductCard name={p} count={25} key={i} /> */}
                {/* ))} */}
                {/* </div> */}
                <div className="grid grid-cols-1 gap-y-3 rounded-2xl bg-secondary-light p-2">
                    {items.map((p, i) => (
                        <ProductCard name={p} count={25} key={i} />
                    ))}
                </div>
            </section>
        </section>
    );
}
