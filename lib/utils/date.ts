import { useTranslations } from "next-intl";

export function datesReferToSameDay(first: Date, second: Date): boolean {
    if (first.getFullYear() != second.getFullYear()) return false;
    if (first.getMonth() != second.getMonth()) return false;
    if (first.getDate() != second.getDate()) return false;
    return true;
}

export function getDayName(day: number): string {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations("functions.date");
    switch (day) {
        case 1:
            return t("mon");
        case 2:
            return t("tue");
        case 3:
            return t("wed");
        case 4:
            return t("thu");
        case 5:
            return t("fri");
        case 6:
            return t("sat");
        default:
            return t("sun");
    }
}

export function getNextDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function getPreviousDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
}
