"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import React, { ForwardedRef, useState } from "react";
import { InputHTMLAttributes } from "react";
import { RequestLogin } from "@/app/api/all/login/route";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

//  TODO: add errors to text inputs (red circle and description underneath)
type FormValues = RequestLogin;

function LoginForm() {
    const t = useTranslations("");
    const router = useRouter();
    const {
        register,
        handleSubmit
        // formState: { errors }
    } = useForm<FormValues>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = (data: FormValues) => {
        axios
            .post("/api/all/login", data)
            .then((response) => {
                router.push("/" + response.data.role.toLowerCase());
            })
            .catch((err) => {
                if (err?.response?.status) {
                    switch (err.response.status) {
                        case 404:
                            setErrorMessage(t("errors.user-not-found"));
                            break;
                        case 401:
                            setErrorMessage(t("errors.wrong-password"));
                            break;
                        default:
                            setErrorMessage(t("errors.server-error"));
                    }
                } else {
                    setErrorMessage(t("errors.network-error"));
                }
            });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-sm flex-col items-stretch gap-4 rounded-2xl bg-secondary-light p-10"
        >
            <TextInput
                label={t("username")}
                type="text"
                {...register("username", { required: true })}
            />
            <TextInput
                label={t("password")}
                type="password"
                {...register("password", { required: true })}
            />
            <div className="text-red-600">{errorMessage}</div>
            <button
                type="submit"
                className="self-center rounded-2xl bg-primary px-4 py-2 text-2xl text-secondary-light"
            >
                {t("login")}
            </button>
        </form>
    );
}

type TextInputProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = React.forwardRef(function TextInput(
    { label, ...props }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    return (
        <div>
            {label && (
                <label htmlFor={props.name} className="text-2xl text-primary">
                    {label}
                </label>
            )}
            <input
                id={props.name}
                className="w-full rounded-lg border-0 bg-secondary-dark text-primary focus:ring-primary"
                ref={ref}
                {...props}
            />
        </div>
    );
});

export default LoginForm;
