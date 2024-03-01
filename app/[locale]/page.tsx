import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.home.metadata");
    return { title: t("title"), description: t("description") };
}

export default function Home() {
    const t = useTranslations("pages.home");
    return <h1>{t("welcome")}</h1>;
}
