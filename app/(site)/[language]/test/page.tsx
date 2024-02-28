import { useTranslation } from "@/i18n";
import { Metadata } from "next";

export async function generateMetadata({
    params: { language: language }
}: {
    params: { language: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(language, "test");
    return { title: t("title"), description: "Login page" };
}

export default async function Home({
    params: { language: language }
}: {
    params: { language: string };
}) {
    const { t } = await useTranslation(language, "test");

    return (
        <h1>
            {language} {t("title")}
        </h1>
    );
}
