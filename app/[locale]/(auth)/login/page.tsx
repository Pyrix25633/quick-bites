import { Metadata } from "next";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import LoginForm from "./_components/LoginForm";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash.pick";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.login.metadata");
    return { title: t("title"), description: t("description") };
}

export default function Login() {
    const messages = useMessages();
    return (
        <main className="container flex h-screen flex-col items-center">
            <Image alt="QuickBites logo" src={logo} className="static h-1/3" />
            <NextIntlClientProvider messages={pick(messages, "components")}>
                <LoginForm />
            </NextIntlClientProvider>
        </main>
    );
}
