import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body className="min-h-screen bg-primary">{children}</body>
        </html>
    );
}
