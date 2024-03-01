import Link from "next/link";

export default function SchoolChooser() {
    const schools = [
        { name: "ITT Vittorio Veneto", id: 1 },
        { name: "ITE Vittorio Veneto", id: 2 },
        { name: "IPSIA Vittorio Veneto", id: 3 }
    ];

    return (
        <main className="container flex min-h-full flex-col items-center justify-center">
            <section className="w-full max-w-sm space-y-2">
                <h2 className="text-3xl text-secondary-light">
                    Seleziona la scuola
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
            href={"./school/" + schoolId}
            className="rounded-2xl bg-secondary-dark p-4 text-center text-primary hover:bg-primary hover:text-secondary-light"
        >
            <h3 className="text-xl">{name}</h3>
        </Link>
    );
}
