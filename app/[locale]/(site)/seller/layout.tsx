import { protectRoute } from "@/lib/auth";
import { redirect } from "next/navigation";

type SellerLayoutProps = {
    children: React.ReactNode;
};

export default async function SellerLayout({ children }: SellerLayoutProps) {
    try {
        await protectRoute(["SELLER"]);
    } catch (_) {
        redirect("/login");
    }

    return <>{children}</>;
}
