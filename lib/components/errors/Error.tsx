type ErrorProps = {
    code: string;
    description: string;
};

export default function Error({ code, description }: ErrorProps) {
    return (
        <main className="container flex min-h-full flex-col items-center justify-center text-center">
            <section className="w-full max-w-sm space-y-2">
                <h1 className="text-5xl text-secondary-light">{code}</h1>
                <h3 className="text-2xl text-secondary-light">{description}</h3>
            </section>
        </main>
    );
}
