import { z } from "zod";

export const UserRoleSchema = z.enum(["user", "admin"]);

export const LogInSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string(), // Not limiting in case constraints change throughout time
    rememberMe: z.boolean().optional(),
});

export const SignUpSchema = z
    .object({
        email: z.string().email({
            message: "Email is required.",
        }),
        password: z
            .string()
            .min(6, {
                message: "Password must be at least 6 characters long.",
            })
            .max(256, {
                message: "Password is too long.",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter.",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter.",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one digit.",
            })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Password must contain at least one special character.",
            }),
        confirmPassword: z.string().min(6, {
            message: "Password must be at least 6 characters long.",
        }),
        username: z
            .string()
            .min(2, {
                message: "Username must be at least 2 characters long.",
            })
            .max(32, {
                message: "Username must be less than 32 characters long.",
            })
            // No spaces
            .regex(/^[^\s]+$/, {
                message: "Username cannot contain spaces.",
            }),
        acceptTerms: z.boolean().refine((accepted) => accepted, {
            message: "You must accept the terms and conditions.",
        }),
        acceptContact: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
