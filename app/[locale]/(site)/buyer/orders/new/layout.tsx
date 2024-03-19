import { NewOrderProvider } from "./_components/NewOrderContext";

export default function NewOrderLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <NewOrderProvider>{children}</NewOrderProvider>;
}
