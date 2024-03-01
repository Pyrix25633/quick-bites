import { protectRoute } from "@/lib/auth";

type SellerLayoutProps = {
    children: React.ReactNode;
};

export default async function SellerLayout({ children }: SellerLayoutProps) {
    try {
        await protectRoute(["SELLER"]);
    } catch (_) {
        return (
            <main className="font-bold text-secondary-light">Forbidden</main>
        );
    }

    return <>{children}</>;
}
