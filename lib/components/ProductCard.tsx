import Link from "next/link";

type ProductCardProps = {
    name: string;
    count: number;
};

export function ProductCard({ name, count }: ProductCardProps) {
    // return (
    //     <Link href=".">
    //         <div className="grid grid-cols-3 gap-2 rounded-2xl bg-secondary-dark p-2 text-primary transition-colors delay-[25ms] hover:bg-primary hover:text-secondary-light lg:grid-cols-4">
    //             <div className="col-span-2 flex flex-col items-center justify-center gap-y-2 text-center lg:col-span-3">
    //                 <div className="text-xl xl:text-2xl">{name}</div>
    //                 <div className="text-3xl font-bold">{count}</div>
    //             </div>
    //             <div className="aspect-square h-full rounded-2xl bg-white"></div>
    //         </div>
    //     </Link>
    // );

    return (
        <Link
            href="."
            className="flex items-center justify-between rounded-2xl bg-secondary-dark p-3 text-primary transition-colors delay-[25ms] hover:bg-primary hover:text-secondary-light"
        >
            <div className="text-xl xl:text-2xl">{name}</div>
            <div className="text-3xl font-bold">{count}</div>
        </Link>
    );
}
