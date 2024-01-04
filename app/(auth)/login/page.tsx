import { Metadata } from "next";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page"
};

export default function Login() {
    return (
        <main className="container flex h-screen flex-col items-center">
            <Image alt="QuickBites logo" src={logo} className="static h-1/3" />
            <form className="flex w-full max-w-sm flex-col items-stretch gap-4 rounded-2xl bg-secondary-light p-10">
                <TextInput label="Email" name="email" type="email" />
                <TextInput label="Password" name="password" type="password" />
                <button
                    type="submit"
                    className="self-center rounded-2xl bg-primary px-4 py-2 text-2xl text-secondary-light"
                >
                    Entra
                </button>
            </form>
        </main>
    );
}

type TextInputProps = {
    label?: string;
    name: string;
    type?: "text" | "email" | "password" | "number";
};

function TextInput({ label, name, type = "text" }: TextInputProps) {
    return (
        <label>
            {label && <div className="text-2xl text-primary">{label}</div>}
            <input
                name={name}
                type={type}
                className="w-full rounded-lg border-0 bg-secondary-dark text-primary focus:ring-primary"
            />
        </label>
    );
}
