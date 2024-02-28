import { languages } from "@/i18n/settings";
import { dir } from "i18next";

export async function generateStaticParams() {
    return languages.map((language) => ({ language: language }));
}

export default function RootLayout({
    children,
    params: { language }
}: {
    children: React.ReactNode;
    params: { language: string };
}) {
    return (
        <html lang={language} dir={dir(language)}>
            <head />
            <body>{children}</body>
        </html>
    );
}
