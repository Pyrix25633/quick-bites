import { Metadata } from "next";
import ViewProductsSection from "./_components/ViewProductsSection";
import DeliverOrderSection from "./_components/DeliverOrderSection";

export const metadata: Metadata = {
    title: "Home",
    description: "See the orders and products"
};

interface PageProps {
    params: {
        schoolId: string;
    };
}

export default function Home({ params }: PageProps) {
    const schoolId = +params.schoolId;

    return (
        <main className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
            <ViewProductsSection schoolId={schoolId} />
            <DeliverOrderSection schoolId={schoolId} />
        </main>
    );
}
