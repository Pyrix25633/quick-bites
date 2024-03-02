import { Metadata } from "next";
import ViewProductsSection from "./_components/ViewProductsSection";
import DeliverOrderSection from "./_components/DeliverOrderSection";
import {
    AbstractIntlMessages,
    NextIntlClientProvider,
    useMessages
} from "next-intl";
import { getTranslations } from "next-intl/server";
import _ from "lodash";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.school.metadata");
    return { title: t("title"), description: t("description") };
}

export default function Home({
    params: { schoolId }
}: {
    params: { schoolId: string };
}) {
    const messages = useMessages();
    return (
        <main className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
            <ViewProductsSection schoolId={+schoolId} />
            <NextIntlClientProvider
                messages={
                    _.get(
                        messages,
                        "components.deliver-order-section"
                    ) as AbstractIntlMessages
                }
            >
                <DeliverOrderSection schoolId={+schoolId} />
            </NextIntlClientProvider>
        </main>
    );
}
