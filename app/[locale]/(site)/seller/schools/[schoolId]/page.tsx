import { Metadata } from "next";
import ViewProductsSection from "./_components/ViewProductsSection";
import DeliverOrderSection from "./_components/DeliverOrderSection";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import _ from "lodash";
import { getIntParam } from "@/lib/utils/type-validation";
import { findSchool as prismaFindSchool } from "@/lib/database/school";
import { isValidElement } from "react";
import NotFoundError from "@/lib/components/errors/NotFoundError";
import { NotFoundResponse } from "@/lib/web/response";
import { School } from "@prisma/client";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.school.metadata");
    return { title: t("title"), description: t("description") };
}

export default async function Home({
    params: { schoolId }
}: {
    params: { schoolId: string };
}) {
    try {
        const messages = await getMessages();
        const parsedSchoolId = getIntParam(schoolId);
        const school = findSchool(parsedSchoolId);
        return (
            <main className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
                <ViewProductsSection schoolId={parsedSchoolId} />
                <NextIntlClientProvider
                    messages={
                        _.get(
                            messages,
                            "components.deliver-order-section"
                        ) as AbstractIntlMessages
                    }
                >
                    <DeliverOrderSection schoolId={parsedSchoolId} />
                </NextIntlClientProvider>
            </main>
        );
    } catch (e: any) {
        if (e instanceof Promise) e = await e;
        if (isValidElement(e)) return e;
        throw e;
    }
}

async function findSchool(id: number): Promise<School> {
    try {
        return await prismaFindSchool(id);
    } catch (e: any) {
        if (e instanceof NotFoundResponse) throw NotFoundError();
        throw e;
    }
}
