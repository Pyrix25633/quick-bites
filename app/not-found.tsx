import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.not-found.metadata");
    return { title: t("title"), description: t("description") };
}

export default function NotFound() {
    const t = useTranslations("pages.not-found");

    return (
        <main className="container flex min-h-full flex-col items-center justify-center">
            <section className="w-full max-w-sm space-y-2">
                <h1 className="text-5xl text-secondary-light">
                    {t("error-code")}
                </h1>
                <h3 className="text-2xl text-secondary-light">
                    {t("error-description")}
                </h3>
            </section>
        </main>
    );
}
