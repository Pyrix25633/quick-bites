import { Metadata } from "next";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page"
};

export default function Login() {
    return (
        <main className="container flex h-screen flex-col items-center">
            <Image alt="QuickBites logo" src={logo} className="static h-1/3" />
            <LoginForm />
        </main>
    );
}
