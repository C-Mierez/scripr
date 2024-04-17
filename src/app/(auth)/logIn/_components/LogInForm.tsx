"use client";

import FormAlertFailure from "~/components/FormAlertFailure";
import FormAlertSuccess from "~/components/FormAlertSuccess";
import FormCheckbox from "~/components/FormCheckbox";
import ClipboardPaste from "~/components/shared/ClipboardPaste";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "actions/auth";
import { MuiOtpInput } from "mui-one-time-password-input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LogInSchema } from "schemas";
import { z } from "zod";

import css from "./LogInForm.module.scss";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export default function LogInForm() {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isTwoFactor, setIsTwoFactor] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof LogInSchema>>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = (values: z.infer<typeof LogInSchema>) => {
        startTransition(() => {
            logIn(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        setIsError(true);
                        setError(data.error);
                    } else {
                        setIsError(false);
                    }

                    if (data?.success) {
                        form.reset();
                        setIsSuccess(true);
                    } else {
                        setIsSuccess(false);
                    }

                    if (data?.twoFactorExpected) {
                        setIsTwoFactor(true);
                    } else {
                        setIsTwoFactor(false);
                    }
                })
                .catch((e) => {
                    setIsError(true);
                    setError(e);
                });
        });
    };

    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "There is already an account using this email. Please log in with that account instead."
            : "";

    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
                {!!isTwoFactor && (
                    <>
                        <FormField
                            control={form.control}
                            name={"twoFactorToken"}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Your Two-Factor Code</FormLabel>
                                        <FormControl>
                                            <MuiOtpInput
                                                {...field}
                                                length={6}
                                                className={css.muiOtp}
                                                inputMode="numeric"
                                            />
                                        </FormControl>
                                        <div className="text-xs text-muted flex flex-col items-center w-full">
                                            <ClipboardPaste
                                                callback={async (text) => {
                                                    form.setValue("twoFactorToken", text.substring(0, 6));
                                                }}
                                            ></ClipboardPaste>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </>
                )}
                {!isTwoFactor && (
                    <>
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="YourEmail@example.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            Password
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowPassword(!showPassword);
                                                }}
                                            >
                                                {showPassword ? (
                                                    <EyeOpenIcon color="var(--color-black)" className="w-4 h-4" />
                                                ) : (
                                                    <EyeClosedIcon color="var(--color-black)" className="w-4 h-4" />
                                                )}
                                            </button>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Password"
                                                type={showPassword ? "text" : "password"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name={"rememberMe"}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <FormCheckbox
                                                id="rememberMe"
                                                label="Remember me"
                                                checked={field.value}
                                                disabled={isPending}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </>
                )}

                {!!urlError && <FormAlertFailure title="Log in failed" message={urlError} />}
                {isError && <FormAlertFailure title="Log in failed" message={error} />}
                {isSuccess && (
                    <FormAlertSuccess title="Logged in successfully!" message={"You will soon be redirected."} />
                )}
                {isTwoFactor && !isPending && !isError && (
                    <FormAlertSuccess
                        title="Authorization is required to access your account."
                        message={"A new confirmation token has been sent to your email."}
                    />
                )}

                <Button type="submit" disabled={isPending}>
                    Log In
                </Button>

                <Button asChild variant={"link"} className="w-fit p-0 self-end text-muted" size={"default"}>
                    <Link href={"/reset"}>Forgot your password?</Link>
                </Button>
            </form>
        </Form>
    );
}
