import { findSchools } from "@/lib/database/school";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = await getTranslations("pages.seller.metadata");
    return { title: t("title"), description: t("description") };
}

export default async function SchoolChooser() {
    const t = await getTranslations("pages.seller");
    const schools = await findSchools();

    return (
        <main className="container flex min-h-full flex-col items-center justify-center">
            <section className="w-full max-w-sm space-y-2">
                <h2 className="text-3xl text-secondary-light">
                    {t("select-school")}
                </h2>
                <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-secondary-light p-3">
                    {schools.map((school, i) => (
                        <SchoolButton
                            key={i}
                            name={school.name}
                            schoolId={school.id}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

type SchoolButtonProps = {
    name: string;
    schoolId: number;
};

function SchoolButton({ name, schoolId }: SchoolButtonProps) {
    return (
        <Link
            href={"./seller/schools/" + schoolId}
            className="rounded-2xl bg-secondary-dark p-4 text-center text-primary hover:bg-primary hover:text-secondary-light"
        >
            <h3 className="text-xl">{name}</h3>
        </Link>
    );
}
