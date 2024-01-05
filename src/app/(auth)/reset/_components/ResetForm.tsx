"use client";
import FormAlertFailure from "@/components/FormAlertFailure";
import FormAlertSuccess from "@/components/FormAlertSuccess";
import FormCheckbox from "@/components/FormCheckbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResetSchema } from "schemas";
import { z } from "zod";

import css from "./ResetForm.module.scss";
import { api } from "~/utils/api";

export default function ResetForm() {
    const { mutateAsync, isSuccess, isError, isLoading, data, error } = api.auth.requestPasswordReset.useMutation();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        mutateAsync({
            email: values.email,
        });
    };

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
                                        disabled={isLoading}
                                        placeholder="YourEmail@example.com"
                                        type="email"
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
                                ? error.data?.zodError?.fieldErrors.email!.reduce((prev, current) => {
                                      return prev + current;
                                  })
                                : error.message
                        }
                    />
                )}
                {isSuccess && (
                    <FormAlertSuccess
                        title="Successfully requested password reset"
                        message={`A confirmation email has been sent to ${data.email}`}
                    />
                )}

                <Button type="submit" disabled={isLoading}>
                    Reset
                </Button>
            </form>
        </Form>
    );
}
