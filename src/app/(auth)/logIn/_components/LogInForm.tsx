"use client";

import { useForm } from "react-hook-form";
import { LogInSchema } from "schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import css from "./LogInForm.module.scss";
import { Button } from "@/components/ui/button";
import FormAlertFailure from "@/components/FormAlertFailure";
import FormAlertSuccess from "@/components/FormAlertSuccess";
import { Checkbox } from "@/components/ui/checkbox";
import FormCheckbox from "@/components/FormCheckbox";

interface LogInFormProps {}

export default function LogInForm({}: LogInFormProps) {
    const form = useForm<z.infer<typeof LogInSchema>>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LogInSchema>) => {
        console.log(values);
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
                                    <Input {...field} placeholder="YourEmail@example.com" type="email" />
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
                                    <Input {...field} placeholder="Password" type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormAlertFailure title="Log In Failed" message="Your email or password is incorrect." />
                <FormAlertSuccess title="Log In Successful" message="You have successfully logged in." />
                <FormCheckbox
                    id="terms"
                    label="Accept terms and conditions"
                    description="You agree to our Terms of Service and Privacy Policy."
                />
                <FormCheckbox id="remember" label="Stay logged in" />
                <Button type="submit">Log In</Button>
            </form>
        </Form>
    );
}
