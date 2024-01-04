"use client";

import FormAlertFailure from "@/components/FormAlertFailure";
import FormAlertSuccess from "@/components/FormAlertSuccess";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordResetSchema } from "schemas";
import { z } from "zod";
import { api } from "~/utils/api";

import css from "./PasswordResetForm.module.scss";

export default function PasswordResetForm() {
    const [isTokenMissing, setIsTokenMissing] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const { isSuccess, isError, isLoading, data, error, mutateAsync } = api.auth.resetPassword.useMutation();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setShouldRedirect(true);
            }, 3000);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (shouldRedirect) {
            redirect("/logIn");
        }
    }, [shouldRedirect]);

    const form = useForm<z.infer<typeof PasswordResetSchema>>({
        resolver: zodResolver(PasswordResetSchema),
        defaultValues: {
            token: token ?? "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
        console.log("Enter");
        if (!token) {
            setIsTokenMissing(true);
            return;
        }
        console.log("Passed");

        mutateAsync({
            token: values.token,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });
    };

    useEffect(() => {
        if (form.formState.errors.token?.message) {
            setIsTokenMissing(true);
        } else {
            setIsTokenMissing(false);
        }
    }, [form.formState.errors]);

    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
                <FormField
                    control={form.control}
                    name={"password"}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isLoading || isSuccess}
                                        placeholder="* * * * *"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name={"confirmPassword"}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isLoading || isSuccess}
                                        placeholder="* * * * *"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                {isError && (
                    <FormAlertFailure
                        title="Reset failed"
                        message={
                            error.shape?.data.zodError
                                ? error.data?.zodError?.fieldErrors.password!.reduce((prev, current) => {
                                      return prev + current;
                                  })
                                : error.message
                        }
                    />
                )}
                {isSuccess && (
                    <FormAlertSuccess
                        title="Successfully reset password."
                        message={`Your new password has been set for ${data.email}`}
                    />
                )}
                {isTokenMissing && (
                    <FormAlertFailure
                        title="Validation error"
                        message={"No valid password reset token has been provided."}
                    />
                )}

                <Button type="submit" disabled={isLoading || isSuccess}>
                    Submit
                </Button>
                <Separator />
                <p className="text-center">
                    <span className="text-muted">
                        If you are having trouble, contact support to receive assistance.
                    </span>
                </p>
            </form>
        </Form>
    );
}
