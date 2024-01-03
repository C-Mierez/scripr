"use client";
import FormAlertFailure from "@/components/FormAlertFailure";
import FormAlertSuccess from "@/components/FormAlertSuccess";
import FormCheckbox from "@/components/FormCheckbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "actions/auth";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LogInSchema } from "schemas";
import { z } from "zod";

import css from "./LogInForm.module.scss";
import { useSearchParams } from "next/navigation";

interface LogInFormProps {}

export default function LogInForm({}: LogInFormProps) {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

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
            logIn(values)
                .then((data) => {
                    if (data?.error) {
                        setIsError(true);
                        setError(data.error);
                    }

                    if (data?.success) {
                        setIsSuccess(true);
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Password" type="password" />
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

                {!!urlError && <FormAlertFailure title="Log in failed" message={urlError} />}
                {isError && <FormAlertFailure title="Log in failed" message={error} />}
                {isSuccess && (
                    <FormAlertSuccess title="Logged in successfully!" message={"You will soon be redirected."} />
                )}

                <Button type="submit" disabled={isPending}>
                    Log In
                </Button>
            </form>
        </Form>
    );
}
