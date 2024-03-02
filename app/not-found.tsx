import NotFoundError from "@/lib/components/errors/NotFoundError";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.not-found.metadata");
    return { title: t("title"), description: t("description") };
}

export default function NotFound() {
    return <NotFoundError></NotFoundError>;
}
