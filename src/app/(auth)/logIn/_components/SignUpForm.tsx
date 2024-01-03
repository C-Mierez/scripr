"use client";

import FormAlertFailure from "@/components/FormAlertFailure";
import FormAlertSuccess from "@/components/FormAlertSuccess";
import FormCheckbox from "@/components/FormCheckbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "schemas";
import { z } from "zod";
import { api } from "~/utils/api";

import css from "./SignUpForm.module.scss";

interface SignUpFormProps {}

export default function SignUpForm({}: SignUpFormProps) {
    const { isLoading, mutateAsync, data, isSuccess, isError, error } = api.auth.signUp.useMutation();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            acceptTerms: true,
            acceptContact: false,
        },
    });

    const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        mutateAsync(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={css.form}>
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
                                    <Input {...field} disabled={isLoading} placeholder="* * * * *" type="password" />
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
                                    <Input {...field} disabled={isLoading} placeholder="* * * * *" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name={"username"}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isLoading} placeholder="John Doe" type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name={"acceptTerms"}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <FormCheckbox
                                        id="acceptTerms"
                                        label="Accept terms and conditions"
                                        description="You agree to our Terms of Service and Privacy Policy."
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
                <FormField
                    control={form.control}
                    name={"acceptContact"}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <FormCheckbox
                                        id="acceptContact"
                                        label="Share contact information"
                                        description="You would like like to receive news and promotional emails."
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

                {isError && <FormAlertFailure title="Sign up error" message={error.message} />}
                {isSuccess && (
                    <FormAlertSuccess title="Signed up successfully!" message="You will soon be redirected." />
                )}

                {/* <FormCheckbox
                    id="terms"
                    label="Accept terms and conditions"
                    description="You agree to our Terms of Service and Privacy Policy."
                />
                <FormCheckbox
                    id="emails"
                    label="Share contact information"
                    description="You would like like to receive news and promotional emails."
                /> */}
                <Button type="submit" disabled={isLoading}>
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}
