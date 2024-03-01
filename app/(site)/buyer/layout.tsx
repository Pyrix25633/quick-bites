import { protectRoute } from "@/lib/auth";

type BuyerLayoutProps = {
    children: React.ReactNode;
};

export default async function BuyerLayout({ children }: BuyerLayoutProps) {
    try {
        await protectRoute(["BUYER"]);
    } catch (_) {
        return (
            <main className="font-bold text-secondary-light">Forbidden</main>
        );
    }

    return <>{children}</>;
}
