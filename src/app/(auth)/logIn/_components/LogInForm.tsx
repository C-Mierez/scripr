"use client";

import FormAlertFailure from "@/components/FormAlertFailure";
import FormAlertSuccess from "@/components/FormAlertSuccess";
import FormCheckbox from "@/components/FormCheckbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LogInSchema } from "schemas";
import { z } from "zod";

import css from "./LogInForm.module.scss";
import { api } from "~/utils/api";

interface LogInFormProps {}

export default function LogInForm({}: LogInFormProps) {
    const { isLoading, mutateAsync, data, isSuccess, isError, error } = api.auth.logIn.useMutation();

    const form = useForm<z.infer<typeof LogInSchema>>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = (values: z.infer<typeof LogInSchema>) => {
        mutateAsync(values);
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
                <FormField
                    control={form.control}
                    name={"password"}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="Password" type="password" />
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
                                        disabled={isLoading}
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

                {isError && <FormAlertFailure title="Log In Failed" message={error.message} />}
                {isSuccess && <FormAlertSuccess title="Log In Success" message={`${data.result}`} />}

                <Button type="submit" disabled={isLoading}>
                    Log In
                </Button>
            </form>
        </Form>
    );
}
