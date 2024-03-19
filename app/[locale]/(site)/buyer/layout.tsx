import { protectRoute } from "@/lib/auth";
import { redirect } from "next/navigation";

type BuyerLayoutProps = {
    children: React.ReactNode;
};

export default async function BuyerLayout({ children }: BuyerLayoutProps) {
    try {
        await protectRoute(["BUYER"]);
    } catch (_) {
        redirect("/login");
    }

    return <>{children}</>;
}
