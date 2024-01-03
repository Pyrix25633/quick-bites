import getDayName from "@/lib/utils/getDayName";

type DayButtonProps = {
    date: Date;
    selected?: boolean;
};

export default function DayButton({ date, selected = false }: DayButtonProps) {
    return (
        <div
            className={
                "flex w-20 shrink-0 flex-col items-center rounded-2xl py-1 " +
                (selected
                    ? "bg-primary text-secondary-light"
                    : "bg-secondary-dark text-primary")
            }
        >
            <div className="text-2xl">{getDayName(date.getDay())}</div>
            <div className="text-5xl">{date.getDate()}</div>
        </div>
    );
}
