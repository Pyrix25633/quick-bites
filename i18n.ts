import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const defaultLocale = "en";
export const locales = [defaultLocale, "it"];
export const localeCookieName = "NEXT_LOCALE";

export default getRequestConfig(
    async ({ locale }: { locale: string }): Promise<{ messages: any }> => {
        if (!locales.includes(locale as any)) notFound();

        return {
            messages: (await import(`./messages/${locale}.json`)).default
        };
    }
);
